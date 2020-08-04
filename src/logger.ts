import * as pino from 'pino';

export interface ILogger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
}

export default (config: any): ILogger => {
  return pino({
    name: config.APP_NAME,
    level: config.LOG_LEVEL,
  });
};
