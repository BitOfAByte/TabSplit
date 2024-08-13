// loggerMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import LoggerService from '../services/logging';

const loggerMiddleware = (route: string) => {
  const logger = new LoggerService(route);

  return (req: Request, res: Response, next: NextFunction) => {
    // Log the request
    logger.info(`Incoming request`, {
      method: req.method,
      url: req.url,
      ip: req.ip,
      headers: req.headers
    });

    // Capture the original end function
    const originalEnd = res.end;

    // Override the end function
    res.end = function(
      this: Response,
      _chunk?: any,
      encoding?: string | (() => void),
      callback?: (() => void)
    ) {
      // Log the response
      logger.info(`Outgoing response`, {
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: res.getHeaders()
      });

      // Handle different function signatures
      if (typeof encoding === 'function') {
        callback = encoding;
        encoding = undefined;
      }

      // Call the original end function
      return originalEnd.apply(this, arguments as any);
    } as Response['end'];

    next();
  };
};

// Error handling middleware
const errorLogger = (logger: LoggerService) => {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error occurred`, {
      error: err.message,
      stack: err.stack,
      method: req.method,
      url: req.url,
      ip: req.ip,
      headers: req.headers
    });

    next(err);
  };
};

export { loggerMiddleware, errorLogger };