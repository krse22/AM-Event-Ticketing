import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { TicketResolver } from './ticket.resolver';
import { TicketService } from './ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, TicketResolver])],
  providers: [TicketService, TicketResolver],
  exports: [TypeOrmModule],
})
export class TicketModule {}