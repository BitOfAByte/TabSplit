import 'dotenv/config';
import express from 'express';
import LoggerService from './services/logging';
import { loggerMiddleware } from './middleware/logger';
import { AppDataSource } from './database/database';

(async() => {
    const app = express();
    app.use(loggerMiddleware('app'));
    const logger: LoggerService = new LoggerService('app');

    app.get('/', (_req, res) => {
        res.send('Hello, world!');
    });

    AppDataSource.initialize().then(():void => console.log('Database connected')).catch((err: Error): void => console.error(err));
    app.listen(process.env.PORT, () => logger.info(`Server started on port ${process.env.PORT}`));
})();