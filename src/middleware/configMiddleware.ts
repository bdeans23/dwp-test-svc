import { NextFunction, Request, Response } from 'express';

/**
 * Pass the config and return alter the request with that config to be used
 * by subsequent middleware. Mutate the request object with the configuration
 * @module middleware/config
 * @export
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {NextFunction} next next function callback supplied by express
 * @returns {void} no return
 */
export default (config: any) => (req: Request, res: Response, next: NextFunction) => {
        req.config = config;
        next();
    };
