import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';

@Module({
  imports: [OrdersModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.HOSTNAME || 'localhost',
    port:3306,
      username: 'service-user',
      password: '1234',
    database:'cosmos',
    entities:[Order, OrderItem],
    synchronize: true, //only on dev
  })],
  
})
export class AppModule {}
