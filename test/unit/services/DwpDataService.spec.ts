import * as request from 'request-promise';
import { DwpDataService, IDwpDataService } from './../../../src/services/DwpDataService';

jest.mock('request-promise');

describe('Unit: src/services/DwpDataService', () => {
  let service: IDwpDataService;
  let fakeRequest: any;
  const fakeError: any = { message: 'DWP_DATA_SERVICE_ERROR', statusCode: 200};

  beforeEach(() => {
    service = new DwpDataService();
    jest.resetAllMocks();
  });

  it('should call get from service', async () => {
    let returnedError;

    fakeRequest = {
      dwpClient: {
        get: jest.fn(),
      },
      config: {
        API_URL: 'https://testurl.co.uk'
      },
      log: {
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn()
      }
    };

    // service.get = jest.fn().mockReturnValue([{}]);
    const spy = jest.spyOn(service, 'get');

    try {
      await service.get(fakeRequest, 'users');
    } catch (error) {
      returnedError = error;
    } finally {
      expect(spy).toHaveBeenCalled();
    }
  });

  it('should handle error from service', async () => {
    let returnedError;

    fakeRequest = {
      // dwpClient: {
      //   get: jest.fn().mockRejectedValue(fakeError),
      // },
      config: {
        API_URL: 'https://testurl.co.uk'
      },
      log: {
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn()
      }
    };

    // service.get = jest.fn().mockReturnValue([{}]);
    const spy = jest.spyOn(service, 'get');

    try {
      await service.get(fakeRequest, 'users');
    } catch (error) {
      returnedError = error;
    } finally {
      expect(spy).toHaveBeenCalled();
      expect(returnedError).toEqual(fakeError);
    }
  });
});
