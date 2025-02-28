import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createCustomerDto } from 'src/dto/create-customer.dto';
import { CustomerStatus, UpdateCustomerStatus } from 'src/dto/update-customer.dto';
import { CustomerItem } from 'src/entity/customer-item.entity';
import { Customer } from 'src/entity/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        @InjectRepository(CustomerItem)
        private readonly customerItemRepository: Repository<CustomerItem>,
    ) {}

    async create(createCustomerDto: createCustomerDto): Promise<Customer> {
        const { customerId, Items } = createCustomerDto;

       
        const customer = this.customerRepository.create({ customerId, status: 'PENDING' });
        const savedCustomer = await this.customerRepository.save(customer);

        
        const customerItems = Items.map((item) =>
            this.customerItemRepository.create({
                name: item.name,
                email: item.email,
                address: item.address,
                customer: savedCustomer,
            }),
        );

       
        await this.customerItemRepository.save(customerItems);
 
        return this.customerRepository.findOne({
            where: { id: savedCustomer.id },
            relations: ['items'],
        });
    }

    async fetch(id: any): Promise<Customer> {
        return this.customerRepository.findOne({
            where: { id },
            relations: ['items'],
        });
    }

    async fetchAll(): Promise<Customer[]> {
        return this.customerRepository.find({ relations: ['items'] });
    }

    async updateCustomerStatus(id: number, updateStatus: UpdateCustomerStatus): Promise<Customer> {
        const customer = await this.customerRepository.findOne({ where: { id } });
        if (!customer) {
            throw new NotFoundException(`Customer with id ${id} not found`);
        }
        if (
            customer.status === CustomerStatus.DELIVERED ||
            customer.status === CustomerStatus.CANCELLED
        ) {
            throw new BadRequestException('Cannot change status of a delivered or cancelled customer');
        }
        customer.status = updateStatus.status;
        return this.customerRepository.save(customer);
    }
}
