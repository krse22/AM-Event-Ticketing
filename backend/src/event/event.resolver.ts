import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { EventService } from "./event.service";
import { EventEntity } from "./event.entity";
import { CreateUserInput } from '../user/DTO/create-user.input';
import { CreateEventInput } from './DTO/create-event.input';

@Resolver(() => EventEntity)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => [EventEntity])
  async getEvents(): Promise<EventEntity[]> {
    return this.eventService.findAll();
  }

  @Query(() => EventEntity)
  async getEventById(@Args('id', { type: () => Int }) id: number): Promise<EventEntity> {
    return this.eventService.getEventById(id);
  }

  @Mutation(() => EventEntity)
  async updateEvent(
    @Args("id", { type: () => Int }) id: number,
    @Args("name", { nullable: true }) name?: string,
    @Args("description", { nullable: true }) description?: string
  ): Promise<EventEntity> {
    return this.eventService.update(id, { name, description });
  }

  @Mutation(() => EventEntity)
  async createEvent(  @Args('input') input: CreateEventInput ): Promise<EventEntity> {
    return this.eventService.create(input);
  }
}