import { Body, Controller, Param, Post, Get, Patch } from '@nestjs/common';
import { createOrderDto } from 'src/dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Order } from 'src/entity/order.entity';
import { UpdateOrderStatus } from 'src/dto/update-order.dto';

@Controller('orders')
export class OrdersController {

    constructor(private ordersService: OrdersService) {}
    @Post()
    async create(@Body() createOrderDto:createOrderDto): Promise<{ order?: Order; message: string }>{

        console.log(createOrderDto);
        return await this.ordersService.create(createOrderDto);

    }

    @Get('/hello')
    getGreeting(){
        return 'dinali';
    }

    @Get(':id')
    async fetch(@Param('id') id:number){
        console.log(id);
        return this.ordersService.fetch(id);
    }

    @Get()
    async fetchAll(){
        return this.ordersService.fetchAll();
    }

    @Patch(':id/status')
    async updateOrderStatus(
        @Param('id') id:number,
        @Body() updateOrderStatus:UpdateOrderStatus
    ){
        return this.ordersService.updateOrderStatus(id, updateOrderStatus);
    }

}
