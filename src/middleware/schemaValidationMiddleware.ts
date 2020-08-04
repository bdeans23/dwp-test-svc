import { NextFunction, Response } from 'express';
import * as Joi from 'joi';
import { IAppRequest } from '../interfaces/IAppRequest';

/**
 * Uses NPM module JOI to validate based on a schema.
 * Schema must
 * be in the format {body: Object, params: Object, query: Object}
 *
 * @module middleware/schemaValidation
 * @export
 * @param {Object} schema validation schema for this endpoint
 * @return {Function} called by express as middleware
 */
export default (schema: any) =>
  /**
   * Uses NPM module JOI to validate based on a schema.  Schema must
   * be in the format {body: <Object>, params: <Object>, query: <Object>}
   * @param {Request} req express request object
   * @param {Response} res express response object
   * @param {NextFunction} next next function callback supplied by express
   */
  (req: IAppRequest, res: Response, next: NextFunction) => {
    const { error } = Joi.validate(req, schema, { allowUnknown: true });
    if (error) {
      next(error);
    } else {
      next();
    }
  };
