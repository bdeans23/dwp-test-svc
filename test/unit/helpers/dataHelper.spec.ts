// tslint:disable
import { DataHelper, IDataHelper } from '../../../src/helpers/dataHelper';
import { londonCoordinates } from '../../../src/helpers/locationHelper';
import { ILocation } from '../../../src/interfaces/ILocation';

describe('Unit: src/helpers/dataHelper', () => {
  let helper: IDataHelper;
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
    body: fakeBody
  }

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

  beforeEach(() => {
    jest.resetAllMocks();
    helper = new DataHelper();
  });

  afterEach(() => {
    jest.spyOn(helper, 'getAllUsers').mockRestore();
  })

  test('helpers/dataHelper.getAllUsers resolves', async () => {
    const response: any = await helper.getAllUsers(
      fakeRequest);
    expect(response).toEqual(undefined);
  });

  test('helpers/dataHelper.getUsersForCity resolves', async () => {
    const response: any = await helper.getUsersForCity(
      fakeRequest);
    console.log('test getUsersForCity: ', response);
    expect(response).toEqual(undefined);
  });

  test('helpers/dataHelper.checkDistanceFromLondon resolves false correctly', async () => {
    const currentCoords = { longitude: 123, latitude: 100 }
    const response: any = await helper.checkDistanceFromLondon(
      londonCoordinates, currentCoords);
    expect(response).toBe(false);
  });

  test('helpers/dataHelper.checkDistanceFromLondon resolves true correctly', async () => {
    const currentCoords: ILocation = { longitude: londonCoordinates.longitude, latitude: londonCoordinates.latitude }
    const response: any = await helper.checkDistanceFromLondon(
      londonCoordinates, currentCoords);
    console.log('test datahelper: ', response);
    expect(response).toBe(true);
  });
});