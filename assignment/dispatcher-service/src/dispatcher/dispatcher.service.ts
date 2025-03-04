import { CreateDispatcherDto } from "src/dto/create-dispatcher.dto";
import { Dispatcher } from "src/entity/dispatcher.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class DispatcherService {
    constructor(
        @InjectRepository(Dispatcher)
        private readonly dispatcherRepository: Repository<Dispatcher>,
    ) { }

    async createDispatcher(CreateDispatcherDto: CreateDispatcherDto): Promise<Dispatcher> {
        const dispatcher = this.dispatcherRepository.create(CreateDispatcherDto);
        return this.dispatcherRepository.save(dispatcher);
    }

}