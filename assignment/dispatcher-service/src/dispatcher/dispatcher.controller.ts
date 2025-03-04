import { Body, Controller, Post } from '@nestjs/common';
import { DispatcherService } from './dispatcher.service';
import { CreateDispatcherDto } from 'src/dto/create-dispatcher.dto';
import { Dispatcher } from 'src/entity/dispatcher.entity';

@Controller('dispatcher')
export class DispatcherController {
    constructor(private readonly dispatcherService: DispatcherService) { }

    @Post()
    async createDispatcher(
        @Body() CreateDispatcherDto: CreateDispatcherDto,): Promise<Dispatcher> {
        return this.dispatcherService.createDispatcher(CreateDispatcherDto)
    }
}
