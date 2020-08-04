export interface IUserModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  ipaddress: string;
  latitude: number;
  longitude: number;
  notes?: string;
}

export class UserModel implements IUserModel {
  public id: number;
  public firstname: string;
  public lastname: string;
  public email: string;
  public ipaddress: string;
  public latitude: number;
  public longitude: number;
  public notes?: string;
}
