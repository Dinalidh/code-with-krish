import { IsEnum } from "class-validator";

export enum InventoryStatus {
    PENDING = 'PENDING',
    CONFIRMED='CONFIRMED',
    SHIPED='SHIPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export class UpdateInventoryStatus {
    @IsEnum(InventoryStatus)
    status: InventoryStatus;
} 