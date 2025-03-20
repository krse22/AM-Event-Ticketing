import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity'; // Assuming you have a User entity
import { OrderEntity } from '../order/order.entity';
import { EventEntity } from '../event/event.entity';
import { TicketUser } from './ticket_user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => User, (user) => user.tickets)
  @Field(() => User)
  user: User;

  @ManyToOne(() => OrderEntity, (order) => order.tickets)
  @Field(() => OrderEntity)
  order: OrderEntity;

  @ManyToOne(() => EventEntity, (event) => event.tickets)
  @Field(() => EventEntity)
  event: EventEntity;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => TicketUser, (ticketUser) => ticketUser.ticket)
  ticketUsers: TicketUser[];
}