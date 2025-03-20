import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { OrderEntity } from "./order.entity";

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [OrderEntity])
  async getOrders(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @Mutation(() => OrderEntity)
  async createOrder(
    @Args("eventId", { type: () => Int }) eventId: number,
    @Args("cost", { type: () => Int }) cost: number,
    @Args("numberOfTickets", { type: () => Int }) numberOfTickets: number
  ): Promise<OrderEntity> {
    return this.orderService.create({ eventId, cost, numberOfTickets });
  }
}