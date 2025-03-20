import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { EventService } from "./event.service";
import { EventEntity } from "./event.entity";

@Resolver(() => EventEntity)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => [EventEntity])
  async getEvents(): Promise<EventEntity[]> {
    return this.eventService.findAll();
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
  async createEvent(
    @Args("name") name: string,
    @Args("description") description: string,
    @Args("ticketLimit", { type: () => Int }) ticketLimit: number
  ): Promise<EventEntity> {
    return this.eventService.create({ name, description, ticketLimit });
  }
}