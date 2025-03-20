
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { EventEntity } from './event/event.entity';
import { OrderEntity } from './order/order.entity';
import { Ticket } from './ticket/ticket.entity';
import { TicketUser } from './ticket/ticket_user.entity'; // Import your entity here

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'am-main',
  synchronize: false,
  logging: false,
  entities: [User, EventEntity, OrderEntity, Ticket, TicketUser],
  migrations: ["dist/migrations/**/*.js"],
  subscribers: [],
});