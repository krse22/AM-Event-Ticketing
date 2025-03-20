import { Resolver, Query } from '@nestjs/graphql';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  // Query to get a list of tickets
  @Query(() => [Ticket])
  async tickets(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

}