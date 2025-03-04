import { Module } from '@nestjs/common';
import { DispatcherService } from './dispatcher.service';
import { DispatcherController } from './dispatcher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispatcher } from 'src/entity/dispatcher.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Dispatcher])],
    providers: [DispatcherService],
    controllers: [DispatcherController]
})
export class DispatcherModule { }
