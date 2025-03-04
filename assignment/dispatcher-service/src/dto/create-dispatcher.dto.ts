import { IsDecimal, IsString} from "class-validator";

export class CreateDispatcherDto {
    @IsString()
    vehicle_number: string;

    @IsDecimal()
    city: string
}