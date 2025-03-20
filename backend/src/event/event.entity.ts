import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Ticket } from '../ticket/ticket.entity';

@ObjectType()
@Entity()
export class EventEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field(() => Int)
  @Column()
  ticketLimit: number;

  @Field(() => Int)
  @Column({ default: 0 })
  ticketsSold: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];
}