import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createOrderDto } from 'src/dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from 'src/dto/update-order.dto';
import { OrderItem } from 'src/entity/order-item.entity';
import { Order } from 'src/entity/order.entity';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Kafka } from 'kafkajs';
import { log } from 'console';
import { Redis } from 'ioredis';

@Injectable()
export class OrdersService implements OnModuleInit {
    private readonly redis = new Redis({ host: '3.0.159.213', port: 6379 });
    private readonly Kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
    private readonly producer = this.Kafka.producer();
    private readonly consumer = this.Kafka.consumer({ groupId: "orders-service" });
    private readonly inventoryServiceUrl = 'http://localhost:3001/products';
    private readonly customerServiceUrl = 'http://localhost:3002/customers';

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
        private readonly httpService: HttpService,
    ) { }
    async onModuleInit() {
        await this.producer.connect();
        await this.consumer.connect();
        await this.consumeConfirmOrders();
    }

    async create(createOrderDto: createOrderDto): Promise<any> {
        console.log(createOrderDto)
        const { customerId, items } = createOrderDto;
        //--------customer
        // Validate customer exists
        let customerName = '';

        try {
            const response$ = this.httpService.get(
                `${this.customerServiceUrl}/${customerId}`,
            );
            const response = await lastValueFrom(response$);
            customerName = response.data.name;
        } catch (error) {
            throw new BadRequestException(
                `Customer ID ${customerId} does not exist.`,
            );
        }

        //aquare lock
        for (const item of items) {
            const lockKey = `dinali:product:${item.productId}:lock`;
            const lock = await this.redis.set(lockKey, 'locked', 'EX', 3600 + 24, 'NX');
            if (!lock) {
                throw new BadRequestException(`product id ${item.productId} is being processed. please try again later`);
            }
        }
        // produce order as an event

        this.producer.send({
            topic: `dinali.order.create`,
            messages: [
                { value: JSON.stringify({ customerId, customerName, items }) },
            ],
        });
        return { message: `order is placed.waiting inventory service to process` };


        // const order = this.orderRepository.create({ customerId, status: 'PENDING', });
        // const savedOrder = await this.orderRepository.save(order);

        // console.log('Itemss' ,items);
        // const orderItems = items.map((item) =>
        //     this.orderItemRepository.create({
        //         productId: item.productId,
        //         price: item.price,
        //         quantity: item.quantity,
        //         order: savedOrder,

        //     }),
        // );

        // await this.orderItemRepository.save(orderItems);
        // return this.orderRepository.findOne({
        //     where: { id: savedOrder.id },
        //     relations: ['items'],
        // })

    }

    async fetch(id: any) {
        return this.orderRepository.findOne({
            where: { id },
            relations: ['items']
        })
    }

    async fetchAll() {
        return this.orderRepository.find({ relations: ['items'] })
    }

    async updateOrderStatus(id: number, updateStatus: UpdateOrderStatus) {
        const order = await this.orderRepository.findOne({ where: { id } })
        if (!order) {
            throw new NotFoundException(`order with is is not found`)
        }
        if (order.status === OrderStatus.DELIVERED ||
            order.status === OrderStatus.CANCELLED) {
            throw new BadRequestException(
                `order status cannot be changed when its delivered or cancelled`,
            );
        }
        order.status = updateStatus.status;
        return this.orderRepository.save(order);

    }
    async consumeConfirmOrders() {
        await this.consumer.subscribe({ topic: 'dinali.order.order.create' });
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                const { customerId, customerName, items } = JSON.parse(
                    message.value.toString(),
                );
                console.log(items, "Order Recived")

                const order = this.orderRepository.create({
                    status: 'CONFIRMED',
                });
                const savedOrder = await this.orderRepository.save(order);

                const orderItems = items.map((item) =>
                    this.orderItemRepository.create({
                        productId: item.productId,
                        price: item.price,
                        quantity: item.quantity,
                        order: savedOrder,
                    }),
                );
                await this.orderItemRepository.save(orderItems);

                //publish the "dinali.order.confirmed"
                await this.producer.send({
                    topic: 'dinali.order.confirmed',
                    messages: [{ value: JSON.stringify({ orderId: savedOrder.id, customerId, customerName }) }]
                });

                console.log('Published dinali.order.confirmed event');
            }
        })

    }
}
