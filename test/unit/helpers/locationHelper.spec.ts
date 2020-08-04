// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import { calculateDistance } from './../../../src/helpers/locationHelper';

describe('Unit: src/helpers/locationHelper', () => {
  describe('calculateDistance', () => {
    it('should return a distance between two points in miles', () => {
      const lon1 = 10;
      const lat1 = -10;
      const lon2 = 20;
      const lat2 = 20;
      const expectedResponse = 2181.44
      const response = calculateDistance(lat1, lon1, lat2, lon2);
      expect(response).to.equal(expectedResponse);
    });
  });
});