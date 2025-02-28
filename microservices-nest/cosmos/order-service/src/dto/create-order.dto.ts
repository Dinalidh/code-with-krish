import { Type } from "class-transformer";
import { IsArray, IsInt, ValidateNested } from "class-validator";

class OrderItemDto {
    productId: number;
    @IsInt()
    price: number;
    @IsInt()
    quantity: number;

}
export class createOrderDto {

    @IsInt()
    customerId: number;
    @IsArray()
    @Type(() => OrderItemDto)
    @ValidateNested({ each: true })
    Items: OrderItemDto[];
}