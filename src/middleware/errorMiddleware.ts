import { NextFunction, Request, Response } from 'express';
import RequestPayload from '../classes/RequestPayload';
import { AppConfig } from '../config';
import { IAppRequest } from '../interfaces/IAppRequest';

/**
 * Error handling module, unified error handling using boom
 *
 * @module middleware/error
 * @param {Object} config key/value pairs of config items
 * @returns {Function} middleware used by express
 */
export default (config: AppConfig) =>

  /**
   * Handles any errors thrown in the next function of any other middleware.
   * Displays an easy to read message to the calling API and handles
   * status codes.
   *
   * Use next(Error) to get here.
   *
   * @param {Error} err Error from previous middleware
   * @module middleware/error
   * @export
   * @param {Request} req express request object
   * @param {Response} res express response object
   * @param {NextFunction} next next function callback supplied by express
   * @returns {void} no return
   */
  (err: Error, req: IAppRequest, res: Response, next: NextFunction) => {
    const data = config.NODE_ENV === 'development' ? err : undefined;
    req.log.error(new RequestPayload(req), err);
    switch (err.name) {
      case 'UnauthorizedError':
        res.boom.unauthorized(err.message);
        break;
      case 'ForbiddenError':
        res.boom.forbidden(err.message);
        break;
      case 'ValidationError':
        res.boom.badRequest(err.message);
        break;
      case 'ConflictError':
        res.boom.conflict(err.message);
        break;
      case 'NotFoundError':
        res.boom.notFound(err.message);
        break;
      case 'NotImplementedError':
        res.boom.notImplemented(err.message);
        break;
      default:
        res.boom.badImplementation(err.message);
    }

    next(err);
  };
