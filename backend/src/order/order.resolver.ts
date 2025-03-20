import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { OrderEntity } from "./order.entity";
import { CreateOrderDto } from './DTO/create-order.input';

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [OrderEntity])
  async getOrdersByUser(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<OrderEntity[]> {
    return this.orderService.findByUser(userId);
  }

  @Mutation(() => OrderEntity)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderDto
  ): Promise<OrderEntity> {
    return this.orderService.create(createOrderInput);
  }
}