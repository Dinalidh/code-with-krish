import { Type } from "class-transformer";
import { IsArray, IsInt, IsString, ValidateNested } from "class-validator";

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
    @IsString()
    city: string;
    @IsArray()
    @Type(() => OrderItemDto)
    @ValidateNested({ each: true })
    items: OrderItemDto[];
}