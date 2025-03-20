"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user/user.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'am-main',
    synchronize: false,
    logging: false,
    entities: [user_entity_1.User],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: [],
});
