import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Ticket } from '../ticket/ticket.entity';
import { TicketUser } from '../ticket/ticket_user.entity';
import { OrderEntity } from '../order/order.entity';
import { EventEntity } from '../event/event.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  password: string; // Store hashed password here

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: Ticket[];

  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => TicketUser, (ticketUser) => ticketUser.user)
  ticketUsers: TicketUser[];
}