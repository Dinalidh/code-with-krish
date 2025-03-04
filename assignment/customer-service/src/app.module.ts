import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { CustomerItem } from './entity/customer-item.entity';

@Module({
  imports: [CustomersModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.HOSTNAME || 'localhost',
    port:3306,
    username: 'service-user',
    password: '1234',
    database:'cosmos',
    entities:[Customer, CustomerItem],
    synchronize: true, //only on dev
  })],
  
})
export class AppModule {}
