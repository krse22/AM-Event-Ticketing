import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./order.entity";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}