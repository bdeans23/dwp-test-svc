import { Request, Response } from 'express';

/**
 * Common route required for each microservice that returns 200 if the
 * system is running.
 * @export
 * @module routes/status
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @returns {void} no return
 */
export default (req: Request, res: Response) => {
  res.status(200).json({ statusCode: 200, message: 'OK' });
};
