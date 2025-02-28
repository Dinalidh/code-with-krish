import { Body, Controller, Param, Post, Get, Patch } from '@nestjs/common';
import { createCustomerDto } from 'src/dto/create-customer.dto';
import { CustomersService } from './customers.service';
import { Customer } from 'src/entity/customer.entity';
import { UpdateCustomerStatus } from 'src/dto/update-customer.dto';

@Controller('customers')
export class CustomersController {

    constructor(private customerService: CustomersService) {}
    @Post()
    async create(@Body() createCustomerDto:createCustomerDto): Promise<Customer>{
        return await this.customerService.create(createCustomerDto);

    }

    @Get('/hello')
    getGreeting(){
        return 'dinali';
    }

    @Get(':id')
    async fetch(@Param('id') id:number){
        console.log(id);
        return this.customerService.fetch(id);
    }

    @Get()
    async fetchAll(){
        return this.customerService.fetchAll();
    }

    @Patch(':id/status')
    async updateCustomerStatus(
        @Param('id') id:number,
        @Body() updateCustomerStatus:UpdateCustomerStatus
    ){
        return this.customerService.updateCustomerStatus(id, updateCustomerStatus);
    }

}
