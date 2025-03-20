import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@InputType()
export class CreateOrderDto {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  eventId: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  numberOfTickets: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  userId: number;
}