import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entity/customer.entity';
import { CustomerItem } from 'src/entity/customer-item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Customer, CustomerItem])],
  providers: [CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule {}
