import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';
import { Ticket } from '../ticket/ticket.entity';
import { User } from '../user/user.entity';

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

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.events, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];
}