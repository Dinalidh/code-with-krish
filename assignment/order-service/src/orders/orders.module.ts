import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { OrderItem } from 'src/entity/order-item.entity';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports:[TypeOrmModule.forFeature([Order, OrderItem]), HttpModule],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
