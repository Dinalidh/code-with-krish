import { IsArray, IsInt, ValidateNested, IsString, IsEmail } from "class-validator";
import { Type } from "class-transformer";

class InventoryItemDto {
    @IsString()
    name: string;

    @IsInt()
    price: number;

    @IsInt()
    quantity: number; // Changed to string for flexibility (can be a number or address string)
}

export class createInventoryDto {
    @IsInt()
    inventoryId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InventoryItemDto)
    items: InventoryItemDto[];
}
