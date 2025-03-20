import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { EventEntity } from "../event/event.entity";
import { Ticket } from '../ticket/ticket.entity';
import { User } from '../user/user.entity';

@ObjectType() // GraphQL Object Type
@Entity()
export class OrderEntity {
  @Field(() => Int) // Expose in GraphQL
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  eventId: number;

  @Field(() => EventEntity)
  @ManyToOne(() => EventEntity)
  event: EventEntity;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field(() => Int)
  @Column()
  cost: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Int)
  @Column()
  numberOfTickets: number;

  @OneToMany(() => Ticket, (ticket) => ticket.order)
  tickets: Ticket[];
}