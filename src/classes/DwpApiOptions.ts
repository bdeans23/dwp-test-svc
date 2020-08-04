import { Request } from 'express';

/**
 * Middleware to set up defaults for DWP API calls
 * @class DwpApiOptions
 */
class DwpApiOptions {

  public headers: any;
  public json: any;

  /**
   * @param {HttpRequest} req the http request object
   * @constructor
   */
  constructor(req: Request) {
    // Configure the request
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    };
    this.json = true;
  }
}

export default DwpApiOptions;
