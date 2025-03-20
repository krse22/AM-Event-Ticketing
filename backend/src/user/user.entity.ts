import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Ticket } from '../ticket/ticket.entity';
import { TicketUser } from '../ticket/ticket_user.entity';

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

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => TicketUser, (ticketUser) => ticketUser.user)
  ticketUsers: TicketUser[];
}