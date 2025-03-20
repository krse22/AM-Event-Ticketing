import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AppDataSource } from './data-source';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TicketModule } from './ticket/ticket.module';
import { OrderModule } from './order/order.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql', // Auto-generates schema
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return AppDataSource.options; // Provide the DataSource options
      },
    }),
    UserModule,
    TicketModule,
    OrderModule,
    EventModule,
  ],
})
export class AppModule {}
