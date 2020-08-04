// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import * as dwpQueries from './../../../src/helpers/dwpQueries';

describe('Unit: src/helpers/dwpQueries', () => {
  const cityName = 'ExampleCity';
  beforeEach(() => {
  });

  describe('getUsersForCityQuery', () => {
    it('should return a query with the correct name', () => {
      const query = dwpQueries.getUsersForCityQuery(cityName);
      expect(query).to.equal('/city/' + cityName + '/users');
    });
  });

  describe('getAllUsersQuery', () => {
    it('should return a query with the correct name', () => {
      const query = dwpQueries.getAllUsersQuery();
      expect(query).to.equal('/users');
    });
  });
});