 // tslint:disable:variable-name
import { NextFunction, Request, Response } from 'express';

/**
 * Payload for every request
 *
 * @export
 * @class RequestPayload
 */
export default class RequestPayload {
    // tslint:disable-next-line:variable-name
    public _messageType: string;
    public _user: string;
    public _sourceUri: string;
    public _destination: string;
    public _method: string;

    /**
     * Instantiates the class
     * @param {Request} req express request
     * @memberof RequestPayload
     */
    constructor(req: Request) {
        this._messageType = 'REQUEST';
        this._sourceUri = req.headers.host;
        this._destination = req.url;
        this._method = req.method;
    }
}
