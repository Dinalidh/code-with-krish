import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Inventory } from './inventory.entity';

@Entity()
export class InventoryItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Inventory, (inventory) => inventory.items)
    inventory: Inventory;
}
