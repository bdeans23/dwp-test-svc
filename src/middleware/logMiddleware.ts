import { NextFunction, Response } from 'express';
import { IAppRequest } from '../interfaces/IAppRequest';

/**
 * Mutates the request to add the log ability
 * @module middleware/log
 * @export
 * @param {Object} logger
 * @return {Function} called by express as middleware
 */
export default (log: any) =>
  /**
   * Middleware to mutate the request to add a function that will send a put.
   * @param {Request} req express request object
   * @param {Response} res express response object
   * @param {NextFunction} next next function callback supplied by express
   * @returns {void} no return
   */
  (req: IAppRequest, res: Response, next: NextFunction) => {
    req.log = log;
    next();
  };
