import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource: DataSource  = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: process.env.NODE_ENV === 'dev' ? true : false,
    synchronize: process.env.NODE_ENV === 'dev' ? true : false,
    migrations: [__dirname + "/migration/*.ts"],
    entities: ['src/entities/**/*.ts'],
})