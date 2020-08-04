import { getAllUsersQuery, getUsersForCityQuery } from '../helpers/dwpQueries';
import { calculateDistance, londonCoordinates } from '../helpers/locationHelper';
import { IAppRequest } from '../interfaces/IAppRequest';
import { ILocation } from '../interfaces/ILocation';
import { DwpDataService, IDwpDataService } from '../services/DwpDataService';

export interface IDataHelper {
  getAllUsers(
    req: IAppRequest,
  ): Promise<any>;
  getUsersForCity(
    req: IAppRequest,
  ): Promise<any>;
  checkDistanceFromLondon(
    londonCoords: ILocation,
    currentUserCoords: ILocation
  ): Promise<boolean>;
}

export class DataHelper implements IDataHelper {

  public async getAllUsers(
    req: IAppRequest,
  ): Promise<any> {
    try {

      const dwpDataService = new DwpDataService();
      const query = getAllUsersQuery();
      const allUsers = await dwpDataService.get(req, query);

      return Promise.resolve(allUsers);
    }
    catch (error) {
      const errorObj = { statusCode: 200, message: 'DATA_HELPER_GET_ALL_USERS_ERROR' };
      return Promise.reject(errorObj);
    }
  }

  public async getUsersForCity(
    req: IAppRequest,
  ): Promise<any> {
    try {
      const dwpDataService = new DwpDataService();
      const query = getUsersForCityQuery(req.body.cityName);
      const usersForCity = await dwpDataService.get(req, query);

      return Promise.resolve(usersForCity);
    }
    catch (error) {
      const errorObj = { statusCode: 200, message: 'DATA_HELPER_GET_USERS_FOR_CITY_ERROR' };
      return Promise.reject(errorObj);
    }
  }

  public async checkDistanceFromLondon(
    londonCoords: ILocation,
    currentUserCoords: ILocation
  ): Promise<boolean> {
    try {
      const distanceFromLondonInMiles: number = calculateDistance(
        londonCoords.latitude,
        londonCoords.longitude,
        currentUserCoords.latitude,
        currentUserCoords.longitude);

      if (distanceFromLondonInMiles < 50) {
        return Promise.resolve(true);
      }

      return Promise.resolve(false);
    }
    catch (error) {
      const errorObj = { statusCode: 200, message: 'DATA_HELPER_CHECK_DISTANCE_ERROR' };
      return Promise.reject(errorObj);
    }
  }
}

export const mockDataHelperFactory: () => IDataHelper = () => {
  return {
    getAllUsers: jest.fn(),
    getUsersForCity: jest.fn(),
    checkDistanceFromLondon: jest.fn()
  };
};
