import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @IsInt()
  @Min(2)
  @Field(() => Int)
  ticketLimit: number;
}