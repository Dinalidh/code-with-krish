import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CustomerItem } from './customer-item.entity';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: number;

    @Column({ default: 'PENDING' })
    status: string;

    @OneToMany(() => CustomerItem, (item) => item.customer, { cascade: true })
    items: CustomerItem[];
}
