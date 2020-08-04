// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import requestMiddleware from './../../../src/middleware/requestWithDefaultsForDwpMiddleware';

describe('Unit: src/middleware/requestWithDefaultsForDwp', () => {
  let fakeRequest;
  let fakeResponse;
  let fakeNext;

  beforeEach(() => {
    fakeRequest = {
      body: {
        cityName: 'Testname'
      }
    };
    fakeResponse = {};
    fakeNext = sinon.stub();

    requestMiddleware(fakeRequest, fakeResponse, fakeNext);
  });

  it('should attach the requestWithDefaults to the request', () => {
    expect(fakeRequest.requestWithDefaults).to.be.a('Function')
  });

  it('should call next', () => {
    expect(fakeNext).to.have.been.called;
  });
});