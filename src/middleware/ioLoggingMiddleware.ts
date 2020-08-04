import { NextFunction, Request, Response } from 'express';

import RequestPayload from '../classes/RequestPayload';
import ResponsePayload from '../classes/ResponsePayload';

/**
 * Logs the IO details for this micro service on request and after the response has
 *
 * @module middleware/ioLogging
 * @export
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {NextFunction} next next function callback supplied by express
 * @returns {void} no return
 */
export default (req: Request, res: Response, next: NextFunction) => {
    // When the request has finished write a log.
    req.log.info(new RequestPayload(req));
    // On each response send an audit.
    res.on('finish', () => {
        req.log.info(new ResponsePayload(req, res));
    });

    next();
};
