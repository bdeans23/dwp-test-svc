import { DataController } from './../../../src/controllers/dataController';
import { DataTransformHelper } from './../../../src/helpers/dataTransformHelper';

describe('Unit: src/controllers/dataController', () => {
  const controller = new DataController();
  let dataTransformHelper: any;
  const fakeDWPResponse: any = [
    {
      id: 135,
      first_name: 'Mechelle',
      last_name: 'Boam',
      email: 'test@here.co.uk',
      ip_address: '113.71.242.187',
      latitude: -6.5115909,
      longitude: 105.652983,
    },
  ];

  jest.mock('./../../../src/helpers/dataHelper', () => {
    // Works and lets you check for constructor calls:
    return {
      DataHelper: jest.fn().mockImplementation(() => {
        // tslint:disable-next-line: no-empty
        return { getUsersForCity: () => { } };
      }),
    };
  });

  beforeEach(() => {
    dataTransformHelper = new DataTransformHelper();
  });

  test('return expected response when given valid format data', async () => {
    expect.assertions(1);

    const expectedResponse: any = undefined;

    const fakeMethod = jest.fn();
    const fakeUrl = 'fake-url';
    const fakeBody = { cityName: 'London' };

    const fakeRequest: any = {
      config: {
        API_URL: fakeUrl,
      },
      requestWithDefaults: {
        get: fakeMethod
      },
      dwpClient: {
        get: fakeMethod,
        post: fakeMethod
      },
      body: fakeBody,
      log: {
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn()
      }
    };
    const fakeResponse: any = jest.fn();
    const fakeNext = jest.fn();
    const result = await controller.getDetails(fakeRequest, fakeResponse, fakeNext);
    expect(result).toEqual(expectedResponse);
  });
});
