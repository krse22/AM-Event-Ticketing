import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "./event.entity";
import { EventService } from "./event.service";
import { EventResolver } from "./event.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  providers: [EventService, EventResolver],
  exports: [TypeOrmModule],
})
export class EventModule {}