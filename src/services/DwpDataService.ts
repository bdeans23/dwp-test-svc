import { IAppRequest } from '../interfaces/IAppRequest';

export interface IDwpDataService {
  get(req: IAppRequest, query: string): Promise<any>;
}

export class DwpDataService implements IDwpDataService {
  public async get(req: IAppRequest, query: string) {

    try {
      return Promise.resolve(req.dwpClient.get
        (
          {
            url: req.config.API_URL + query,
          }
        ));

    } catch (error) {
      const errorObj = { statusCode: 200, message: 'DWP_DATA_SERVICE_ERROR' };
      return Promise.reject(errorObj);
    }
  }
}
