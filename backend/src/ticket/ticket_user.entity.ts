import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Ticket } from './ticket.entity';

@Entity('ticket_user')
export class TicketUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ticketUsers)
  user: User;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketUsers)
  ticket: Ticket;

}