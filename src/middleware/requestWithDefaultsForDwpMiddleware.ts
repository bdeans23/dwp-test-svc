import { NextFunction, Request, Response } from 'express';
import * as requestPromise from 'request-promise';
import DwpApiOptions from '../classes/DwpApiOptions';

/**
 * To make sure the reply is in json set the defaults to only accept json
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {NextFunction} next next function callback supplied by express
 * @returns {void} no return
 */
export default (req: Request, res: Response, next: NextFunction) => {
    const requestWithDefaults = requestPromise.defaults(new DwpApiOptions(req));
    req.requestWithDefaults = requestWithDefaults;
    next();
};
