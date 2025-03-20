import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client } from 'pg';
import { AppDataSource } from './data-source';

async function bootstrap() {
  await checkDatabase();

  await AppDataSource.initialize();

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

async function checkDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '',
  });

  try {
    await client.connect();
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'am-main'");

    if (res.rowCount === 0) {
      await client.query('CREATE DATABASE "am-main"');
      console.log('Database "am-main" created!');
    } else {
      console.log('Database "am-main" already exists.');
    }

    await client.end();
  } catch (err) {
    console.error('Error:', err);
  }
}

bootstrap();
