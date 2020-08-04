import { IUser } from '../interfaces/IUser';
import { UserModel } from '../models/user';

export interface IDataTransformHelper {
  transformData(
    userData: IUser,
    notes?: string
  ): Promise<UserModel>;
  getId(
    id: number
  ): number;
  getFirstName(
    firstname: string
  ): string;
  getLastName(
    lastname: string
  ): string;
  getEmailAddress(
    email: string
  ): string;
  getIpAddress(
    email: string
  ): string;
  getLongitude(
    longitude: string | number
  ): number;
  getLatitude(
    latitude: string | number
  ): number;
  getNotes(
    notes: string
  ): string;
}

export class DataTransformHelper implements IDataTransformHelper {

  public async transformData(
    userData: IUser,
    notes?: string,
  ): Promise<UserModel> {
    try {
      const dwpUserData = new UserModel();

      dwpUserData.id = this.getId(userData.id);
      dwpUserData.firstname = this.getFirstName(userData.first_name);
      dwpUserData.lastname = this.getLastName(userData.last_name);
      dwpUserData.email = this.getEmailAddress(userData.email);
      dwpUserData.ipaddress = this.getIpAddress(userData.ip_address);
      dwpUserData.latitude = this.getLatitude(userData.latitude);
      dwpUserData.longitude = this.getLongitude(userData.longitude);
      dwpUserData.notes = this.getNotes(notes);

      return Promise.resolve(dwpUserData);
    }
    catch (error) {
      const errorObj = { statusCode: 200, message: 'DATA_HELPER_TRANSFORM_DATA_ERROR' };
      return Promise.reject(errorObj);
    }
  }

  public getId(userId: number): number {
    return Number(userId);
  }

  public getFirstName(userFirstname: string): string {
    let firstname: string;

    if (userFirstname) {
      const names = userFirstname.split(' ');
      firstname = names[0];
      return firstname;
    }

    return undefined;
  }

  public getLastName(userLastname: string): string {
    if (userLastname) { return userLastname; }
    else { return undefined; }
  }

  public getEmailAddress(userEmailAddress: string): string {
    return userEmailAddress;
  }

  public getIpAddress(userIpAddress: string): string {
    if (userIpAddress) { return userIpAddress; }
    else { return undefined; }
  }

  public getLatitude(userLatitude: string | number): number {
    if (userLatitude) { return Number(userLatitude); }
    else { return undefined; }
  }

  public getLongitude(userLongitude: string | number): number {
    if (userLongitude) { return Number(userLongitude); }
    else { return undefined; }
  }

  public getNotes(notes: string): string {
    if (notes) { return notes; }
    else { return undefined; }
  }
}

export const mockDataTransformHelperFactory: () => IDataTransformHelper = () => {
  return {
    transformData: jest.fn(),
    getId: jest.fn(),
    getFirstName: jest.fn(),
    getLastName: jest.fn(),
    getEmailAddress: jest.fn(),
    getIpAddress: jest.fn(),
    getLongitude: jest.fn(),
    getLatitude: jest.fn(),
    getNotes: jest.fn()
  };
};
