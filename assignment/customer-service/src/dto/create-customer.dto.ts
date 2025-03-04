import { IsArray, IsInt, ValidateNested, IsString, IsEmail } from "class-validator";
import { Type } from "class-transformer";

class CustomerItemDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    address: string; // Changed to string for flexibility (can be a number or address string)
}

export class createCustomerDto {
    @IsInt()
    customerId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CustomerItemDto)
    items: CustomerItemDto[];
}
