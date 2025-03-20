import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./order.entity";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";
import { EventModule } from '../event/event.module';
import { UserModule } from '../user/user.module';
import { TicketModule } from '../ticket/ticket.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), EventModule, UserModule, TicketModule],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}