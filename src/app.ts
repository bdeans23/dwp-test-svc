import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';
import * as express from 'express';
import * as boom from 'express-boom';
import * as helmet from 'helmet';
import * as https from 'https';
import NotFoundError from './errors/NotFoundError';
import logger from './logger';
import configMiddleware from './middleware/configMiddleware';
import devLoggingMiddleware from './middleware/devLoggingMiddleware';
import dwpHttpClientMiddleware from './middleware/dwpHttpClientMiddleware';
import errorMiddleware from './middleware/errorMiddleware';
import ioLoggingMiddleware from './middleware/ioLoggingMiddleware';
import logMiddleware from './middleware/logMiddleware';
import dataRoutes from './routes/data';
import statusRoute from './routes/status';

const mainApplication = (config: any) => {
  const app = express();
  const log = logger(config);

  // Allow the use of boom when sending errors to user
  app.use(boom());

  // The order of the following middleware is important!
  // Harden response - security
  app.use(helmet());

  // Parse body into an object
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json());

  // Get the cookie from the header and add to request
  app.use(cookieParser());

  // Attach logger middleware
  app.use(logMiddleware(log));
  app.use(devLoggingMiddleware(config));
  app.use(ioLoggingMiddleware);

  // Attach config middleware
  app.use(configMiddleware(config));

  // Attach http client middleware
  app.use(dwpHttpClientMiddleware);

  // Routes
  app.get('/api/status', statusRoute);

  // Add routes
  dataRoutes(app);

  // Handle 404 errors
  app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError('Not Found')));

  // Error handler
  app.use(errorMiddleware(config));

  // Start express server
  if (config.SSL_ON === 'true') {
    const serverOptions = { key: config.SSL_KEY, cert: config.SSL_CERT };

    https.createServer(serverOptions, app)
      .listen(config.APP_PORT, () => {
        log.info(`Listening on port ${config.APP_PORT}.`);
      });
  }
  else {
    app.listen(config.APP_PORT, () => {
      log.info(`Listening on port ${config.APP_PORT}.`);
    });
  }
};

export default mainApplication;
