import { NextFunction, Response } from 'express';
import * as requestPromise from 'request-promise';
import { IAppRequest } from '../interfaces/IAppRequest';

export default (req: IAppRequest, res: Response, next: NextFunction) => {
  const httpDefaults = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    json: true,
  };

  req.dwpClient = requestPromise.defaults(httpDefaults);
  next();
};
