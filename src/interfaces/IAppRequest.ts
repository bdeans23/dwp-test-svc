import { Request } from 'express';
import { RequestAPI as RequestAPIDefault } from 'request';
import { AppConfig } from '../config';

export type RequestAPI = RequestAPIDefault<any, any, any>;

export interface IAppRequest extends Request {
  config?: AppConfig;
  dwpClient: RequestAPI;
  log?: any;
}
