import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Fetch tickets by user
  async findTicketsByUser(userId: number): Promise<Ticket[]> {
    await this.userRepository.findOneByOrFail({ id: userId });

    return this.ticketRepository.find({
      where: { userId },
      relations: ['event'],
    });
  }
}