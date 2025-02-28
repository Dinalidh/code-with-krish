import { Module } from '@nestjs/common';
import { InventoryService } from './inventorys.service';
import { InventorysController } from './inventorys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from 'src/entity/inventory.entity';
import { InventoryItem } from 'src/entity/inventory-item.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Inventory, InventoryItem])],
  providers: [InventoryService],
  controllers: [InventorysController]
})
export class InventorysModule {}
