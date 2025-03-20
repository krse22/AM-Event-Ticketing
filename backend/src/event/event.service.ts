// src/event/event.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventEntity } from "./event.entity";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>
  ) {}

  async findAll(): Promise<EventEntity[]> {
    return this.eventRepository.find();
  }

  async create(data: Partial<EventEntity>): Promise<EventEntity> {
    const event = this.eventRepository.create(data);
    return this.eventRepository.save(event);
  }
}