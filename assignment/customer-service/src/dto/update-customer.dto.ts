import { IsEnum } from "class-validator";

export enum CustomerStatus {
    PENDING = 'PENDING',
    CONFIRMED='CONFIRMED',
    SHIPED='SHIPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export class UpdateCustomerStatus {
    @IsEnum(CustomerStatus)
    status: CustomerStatus;
} 