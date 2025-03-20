import { Resolver, Query, Args } from '@nestjs/graphql';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Query(() => [Ticket], { name: 'ticketsByUser' })
  async getTicketsByUser(@Args('userId') userId: number): Promise<Ticket[]> {
    return this.ticketService.findTicketsByUser(userId);
  }
}