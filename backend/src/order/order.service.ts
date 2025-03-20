import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "./order.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find({ relations: ["event"] });
  }

  async create(data: Partial<OrderEntity>): Promise<OrderEntity> {
    const order = this.orderRepository.create(data);
    return this.orderRepository.save(order);
  }
}