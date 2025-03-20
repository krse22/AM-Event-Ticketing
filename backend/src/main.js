"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const pg_1 = require("pg");
const data_source_1 = require("./data-source");
async function bootstrap() {
    await checkDatabase();
    await data_source_1.AppDataSource.initialize();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(process.env.PORT ?? 3000);
}
async function checkDatabase() {
    const client = new pg_1.Client({
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
        }
        else {
            console.log('Database "am-main" already exists.');
        }
        await client.end();
    }
    catch (err) {
        console.error('Error:', err);
    }
}
bootstrap();
