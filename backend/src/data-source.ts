
import { DataSource } from 'typeorm';
import { User } from './user/user.entity'; // Import your entity here

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres', // Your username
  password: '', // Your password
  database: 'am-main', // The database to connect to
  synchronize: false, // Synchronize the schema
  logging: false, // Logging queries
  entities: [User], // List of entities
  migrations: ["src/migrations/**/*.js"], // Path to migrations (optional)
  subscribers: [], // Event subscribers (optional)
});