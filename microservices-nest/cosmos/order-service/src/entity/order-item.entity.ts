import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    productId:number;
    @Column('decimal')
    price:number;
    @Column()
    quantity: number;

    @ManyToOne(()=>Order,(Order)=>Order.items,{onDelete: 'CASCADE'})
    order:Order;
}