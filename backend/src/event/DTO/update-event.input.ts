import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}