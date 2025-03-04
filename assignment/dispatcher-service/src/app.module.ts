import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispatcher } from './entity/dispatcher.entity';
import { DispatcherModule } from './dispatcher/dispatcher.module';


@Module({
  imports: [DispatcherModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.HOSTNAME || 'localhost',
    port:3306,
    username: 'service-user',
    password: '1234',
    database:'cosmos',
    entities:[Dispatcher],
    synchronize: true, //only on dev
  }), ],
  
})
export class AppModule {}
