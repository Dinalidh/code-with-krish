import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { InventoryItem } from './inventory-item.entity';

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    inventoryId: number;

    @Column({ default: 'PENDING' })
    status: string;

    @OneToMany(() => InventoryItem, (item) => item.inventory, { cascade: true })
    items: InventoryItem[];
}
