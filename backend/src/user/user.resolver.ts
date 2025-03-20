import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './DTO/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }


  @Mutation(() => User)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(input);
  }

}