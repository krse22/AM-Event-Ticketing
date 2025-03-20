// src/event/event.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventEntity } from "./event.entity";
import { UpdateEventInput } from './DTO/update-event.input';
import { CreateEventInput } from './DTO/create-event.input';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>
  ) {}

  async update(id: number, updateEventInput: UpdateEventInput): Promise<EventEntity> {
    const event = await this.eventRepository.findOneByOrFail({ id });

    if (updateEventInput.name) {
      event.name = updateEventInput.name;
    }

    if (updateEventInput.description) {
      event.description = updateEventInput.description;
    }

    return this.eventRepository.save(event);
  }

  async create(createEventInput: CreateEventInput): Promise<EventEntity> {
    if (createEventInput.ticketLimit <= 1) {
      throw new Error('Ticket limit must be greater than 1');
    }

    const event = this.eventRepository.create({
      ...createEventInput,
      ticketsSold: 0,
    });

    return this.eventRepository.save(event);
  }

  async findAll(): Promise<EventEntity[]> {
    return this.eventRepository.find();
  }

}