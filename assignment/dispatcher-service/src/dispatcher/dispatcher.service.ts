import { CreateDispatcherDto } from "src/dto/create-dispatcher.dto";
import { Dispatcher } from "src/entity/dispatcher.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {NotFoundException} from '@nestjs/common';

export class DispatcherService {
    constructor(
        @InjectRepository(Dispatcher)
        private readonly dispatcherRepository: Repository<Dispatcher>,
    ) { }

    async createDispatcher(CreateDispatcherDto: CreateDispatcherDto): Promise<Dispatcher> {
        const dispatcher = this.dispatcherRepository.create(CreateDispatcherDto);
        return this.dispatcherRepository.save(dispatcher);
    }

    async getDispatcherBycity(city: string): Promise<Dispatcher> {
        const dispatcher = await this.dispatcherRepository.findOne({ where: { city } });
        if (!dispatcher) {
            throw new NotFoundException(`Dispatcher with City ${city} not found`);
        }
        return dispatcher;
    }

}