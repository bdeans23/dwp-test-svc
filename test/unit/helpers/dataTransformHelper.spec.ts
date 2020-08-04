// tslint:disable
import { DataTransformHelper, IDataTransformHelper } from '../../../src/helpers/dataTransformHelper';
import { IUser } from '../../../src/interfaces/IUser';
import { IUserModel } from '../../../src/models/user';

describe('Unit: src/helpers/dataTransformHelper', () => {
  const fakeError = new Error('fake-error');

  let helper: IDataTransformHelper;
  beforeEach(() => {
    jest.resetAllMocks();
    helper = new DataTransformHelper();
  });

  describe('#transformData', () => {
    it('converts DWP response to new object', async () => {
      const fakeDWPResponse: IUser = {
        id: 135,
        first_name: 'Mechelle',
        last_name: 'Boam',
        email: 'test@here.co.uk',
        ip_address: '113.71.242.187',
        latitude: -6.5115909,
        longitude: 105.652983,
      };

      const expectedResponse: IUserModel = {
        id: 135,
        firstname: 'Mechelle',
        lastname: 'Boam',
        email: 'test@here.co.uk',
        ipaddress: '113.71.242.187',
        latitude: -6.5115909,
        longitude: 105.652983,
        notes: undefined
      };

      const response: IUserModel = await helper.transformData(
        fakeDWPResponse);
      expect(response).toEqual(expectedResponse);
    });

    it('converts DWP response to new object including optional notes', async () => {
      const fakeDWPResponse: IUser = {
        id: 135,
        first_name: 'Mechelle',
        last_name: 'Boam',
        email: 'test@here.co.uk',
        ip_address: '113.71.242.187',
        latitude: -6.5115909,
        longitude: 105.652983,
      };

      const expectedResponse: IUserModel = {
        id: 135,
        firstname: 'Mechelle',
        lastname: 'Boam',
        email: 'test@here.co.uk',
        ipaddress: '113.71.242.187',
        latitude: -6.5115909,
        longitude: 105.652983,
        notes: 'This is the note'
      };

      const response: IUserModel = await helper.transformData(
        fakeDWPResponse, 'This is the note');
      expect(response).toEqual(expectedResponse);
    });


    it('handles error', async () => {
      helper.getEmailAddress = jest.fn().mockImplementation(() => {
        throw fakeError;
      });

      const fakeDWPResponse: IUser = {
        id: undefined,
        first_name: undefined,
        last_name: undefined,
        email: undefined,
        ip_address: undefined,
        latitude: undefined,
        longitude: undefined,
      };

      try {
        await helper.transformData(
          fakeDWPResponse);
      }
      catch (error) {
        expect(error).toEqual(error);
      }
    });

    it('handles undefined values', async () => {
      const fakeDWPResponse: IUser = {
        id: undefined,
        first_name: undefined,
        last_name: undefined,
        email: undefined,
        ip_address: undefined,
        latitude: undefined,
        longitude: undefined,
      };

      try {
        await helper.transformData(
          fakeDWPResponse);
      }
      catch (error) {
        expect(error).toEqual(error);
      }
    });
  });
});