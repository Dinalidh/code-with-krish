import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
    public greeting(): String {
        const message: string = "Hello from Employee";
        return message
    }


}
