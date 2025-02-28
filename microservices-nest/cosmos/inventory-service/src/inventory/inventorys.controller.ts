import { Body, Controller, Param, Post, Get, Patch } from '@nestjs/common';
import { createInventoryDto } from 'src/dto/create-inventory.dto';
import { InventoryService } from './inventorys.service';
import { Inventory } from 'src/entity/inventory.entity';
import { UpdateInventoryStatus } from 'src/dto/update-inventory.dto';

@Controller('inventorys')
export class InventorysController {

    constructor(private inventoryService: InventoryService) {}
    @Post()
    async create(@Body() createInventoryDto:createInventoryDto): Promise<Inventory>{
        return await this.inventoryService.create(createInventoryDto);

    }

    @Get('/hello')
    getGreeting(){
        return 'dinali';
    }

    @Get(':id')
    async fetch(@Param('id') id:number){
        console.log(id);
        return this.inventoryService.fetch(id);
    }

    @Get()
    async fetchAll(){
        return this.inventoryService.fetchAll();
    }

    @Patch(':id/status')
    async updateInventoryStatus(
        @Param('id') id:number,
        @Body() updateInventoryStatus:UpdateInventoryStatus
    ){
        return this.inventoryService.updateInventoryStatus(id, updateInventoryStatus);
    }

}
