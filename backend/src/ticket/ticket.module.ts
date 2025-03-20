import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { TicketResolver } from './ticket.resolver';
import { TicketService } from './ticket.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, TicketResolver]), UserModule],
  providers: [TicketService, TicketResolver],
  exports: [TypeOrmModule],
})
export class TicketModule {}