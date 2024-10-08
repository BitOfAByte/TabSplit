import * as winston from 'winston';

const dateFormat = (): string => {
  return new Date(Date.now()).toUTCString();
};

class LoggerService {
  private log_data: any;
  private route: string;
  private logger: winston.Logger;

  constructor(route: string) {
    this.log_data = null;
    this.route = route;
    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
      ],
      format: winston.format.printf((info) => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `;
        message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message;
        message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message;
        return message;
      })
    });
    this.logger = logger;
  }

  setLogData(log_data: any): void {
    this.log_data = log_data;
  }

  async info(message: string): Promise<void>;
  async info(message: string, obj: any): Promise<void>;
  async info(message: string, obj?: any): Promise<void> {
    this.logger.log('info', message, obj ? { obj } : undefined);
  }

  async debug(message: string): Promise<void>;
  async debug(message: string, obj: any): Promise<void>;
  async debug(message: string, obj?: any): Promise<void> {
    this.logger.log('debug', message, obj ? { obj } : undefined);
  }

  async error(message: string): Promise<void>;
  async error(message: string, obj: any): Promise<void>;
  async error(message: string, obj?: any): Promise<void> {
    this.logger.log('error', message, obj ? { obj } : undefined);
  }
}

export default LoggerService;