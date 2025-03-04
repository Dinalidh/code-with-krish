import { Module } from '@nestjs/common';
import { InventorysModule } from './inventory/inventorys.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entity/inventory.entity';
import { InventoryItem } from './entity/inventory-item.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './entity/product.entity';

@Module({
  imports: [InventorysModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.HOSTNAME || 'localhost',
    port:3306,
    username: 'service-user',
    password: '1234',
    database:'cosmos',
    entities:[Inventory, InventoryItem, Product],
    synchronize: true, //only on dev
  }), ProductsModule],
  
})
export class AppModule {}
