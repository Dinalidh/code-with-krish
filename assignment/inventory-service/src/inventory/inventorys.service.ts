import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createInventoryDto } from 'src/dto/create-inventory.dto';
import { InventoryStatus, UpdateInventoryStatus } from 'src/dto/update-inventory.dto';
import { InventoryItem } from 'src/entity/inventory-item.entity';
import { Inventory } from 'src/entity/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
        @InjectRepository(InventoryItem)
        private readonly inventoryItemRepository: Repository<InventoryItem>,
    ) {}

    async create(createInventoryDto: createInventoryDto): Promise<Inventory> {
        console.log(createInventoryDto);
        const { inventoryId, items } = createInventoryDto;
        const inventory = this.inventoryRepository.create({ inventoryId, status: 'PENDING' });
        const savedInventory = await this.inventoryRepository.save(inventory);

        console.log('Itemss' ,items);
        const inventoryItems = items.map((item) =>
            this.inventoryItemRepository.create({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                inventory: savedInventory,
            }),
        );

       
        await this.inventoryItemRepository.save(inventoryItems);
 
        return this.inventoryRepository.findOne({
            where: { id: savedInventory.id },
            relations: ['items'],
        });
    }

    async fetch(id: any): Promise<Inventory> {
        return this.inventoryRepository.findOne({
            where: { id },
            relations: ['items'],
        });
    }

    async fetchAll(): Promise<Inventory[]> {
        return this.inventoryRepository.find({ relations: ['items'] });
    }

    async updateInventoryStatus(id: number, updateStatus: UpdateInventoryStatus): Promise<Inventory> {
        const inventory = await this.inventoryRepository.findOne({ where: { id } });
        if (!inventory) {
            throw new NotFoundException(`Customer with id ${id} not found`);
        }
        if (
            inventory.status === InventoryStatus.DELIVERED ||
            inventory.status === InventoryStatus.CANCELLED
        ) {
            throw new BadRequestException('Cannot change status of a delivered or cancelled customer');
        }
        inventory.status = updateStatus.status;
        return this.inventoryRepository.save(inventory);
    }

}
