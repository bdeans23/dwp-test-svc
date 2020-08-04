import { NextFunction, Response } from 'express';
import ValidationError from '../errors/ValidationError';
import { DataHelper } from '../helpers/dataHelper';
import { DataTransformHelper } from '../helpers/dataTransformHelper';
import { londonCoordinates } from '../helpers/locationHelper';
import { IAppRequest } from '../interfaces/IAppRequest';
import { ILocation } from '../interfaces/ILocation';
import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../models/user';

export interface IDataController {
  getDetails(
    req: IAppRequest,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}

export class DataController implements IDataController {
  public async getDetails(req: IAppRequest, res: Response, next: NextFunction): Promise<any> {
    const userDetails: IUserModel[] = [];
    const dataTransformHelper = new DataTransformHelper();
    const dataHelper = new DataHelper();

    const requestBody: any = {
      cityName: req.body.cityName
    };

    try {
      req.log.debug('Details received: ', requestBody);
      // Get users with a city name of London
      const londonUsers: IUser[] = await dataHelper.getUsersForCity(req);

      // Transform for output
      for (const currentUser of londonUsers) {
        const userDetailsObj = await dataTransformHelper.transformData(
          currentUser, 'City is London');
        userDetails.push(userDetailsObj);
      }

      // As GetUsers does not return a cityName, we need to calculate distance from London for all users
      // For each user in full users array send longitude and latitude to distanceChecker.
      // If within range add to new array.
      const allUsers = await dataHelper.getAllUsers(req);

      for (const user of allUsers) {
        const currentUserCoords: ILocation = { longitude: user.longitude, latitude: user.latitude };
        const isWithin50MilesOfLondon = await dataHelper.checkDistanceFromLondon(londonCoordinates, currentUserCoords);

        if (isWithin50MilesOfLondon) {
          const userDetailsObj = await dataTransformHelper.transformData(
            user, 'Current coordinates are within 50 miles of London');

          userDetails.push(userDetailsObj);
        }
      }

      // Sort on last name before outputting
      userDetails.sort((a, b) => a.lastname.localeCompare(b.lastname));
      req.log.info('This is the response body: ', userDetails);
      res.status(200).json(userDetails);
      return;
    } catch (e) {
      next(new ValidationError(e));
    }
  }
}
