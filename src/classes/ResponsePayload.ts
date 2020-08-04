 // tslint:disable:variable-name
import { NextFunction, Request, Response } from 'express';
import RequestPayload from './RequestPayload';

/**
 * Payload for every response
 *
 * @export
 * @class ResponsePayload
 * @extends {RequestPayload}
 */
export default class ResponsePayload extends RequestPayload {
    public _status: number;

    /**
     * Instantiates the class
     * @constructor
     * @param {Request} req express request
     * @param {Response} res express response
     * @memberof ResponsePayload
     */
    constructor(req: Request, res: Response) {
        super(req);
        this._messageType = 'RESPONSE';
        this._status = res.statusCode;
    }
}
