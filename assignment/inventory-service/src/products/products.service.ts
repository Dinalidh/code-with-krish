import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';
import { Kafka } from 'kafkajs';

@Injectable()
export class ProductsService implements OnModuleInit {
    private readonly kafka = new Kafka({brokers: ['3.0.159.213:9092']});
    private readonly producer = this.kafka.producer();
    private readonly consumer = this.kafka.consumer({groupId: "inventory-service"});
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}
    async onModuleInit(){
        await this.producer.connect();
        await this.consumer.connect();
        await this.consumeOrderCreated();
      }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
    }

    async getProductById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async validateStock(
        id: number,
        quantity: number,): Promise<{ available: boolean }> {
        const product = await this.getProductById(id);
        return { available: product.quantity >= quantity };
    }

    async reduceStock(
        id: number,
        quantity: number,): Promise<{ available: boolean }> {
        const product = await this.getProductById(id);

        if (product.quantity < quantity) {
            throw new BadRequestException('Insufficient stock');
        }

        product.quantity -= quantity;
        await this.productRepository.save(product);

        return { available: true };
    }

    async updateStock(
        id: number,
        quantity: number
    ): Promise<Product> {

        if (!id || isNaN(quantity)){
            throw new BadRequestException('Invalid prodcu ID or quantity');
        }
        const product = await this.getProductById(id);

        if (product.quantity < quantity) {
            throw new BadRequestException('Insufficient stock');
        }

        product.quantity -= quantity;
        await this.productRepository.save(product);

        return product;
        
    }
    async consumeOrderCreated(){
        await this.consumer.subscribe({topic:'dinali.order.create'});
    
        await this.consumer.run({
          eachMessage: async ( { message }) => {
            console.log("new message arrived-----------------");
            const { customerId, customerName, items} = JSON.parse (
              message.value.toString(),
            );
            for (const item of items) {
              await this.reduceStock(item.productId, item.quantity);
            }
            await this.producer.send({
              topic: 'dinali.order.inventory.update',
              messages: [
                { value: JSON.stringify({customerId, customerName, items})}
              ],
            });
          }
        })
      }
}
