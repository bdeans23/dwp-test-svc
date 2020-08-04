// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

// tslint:disable
// Setup requirements for this test
import statusRoute from './../../../src/routes/status';

describe('Unit: src/routes/status', () => {
  let fakeRequest, fakeResponse;

  beforeEach(() => {
    fakeRequest = {};
    fakeResponse = {};
    fakeResponse.status = sinon.stub().returns(fakeResponse);
    fakeResponse.json = sinon.stub().returns(fakeResponse);
  });

  describe('When a request is received', () => {
    beforeEach(() => {
      statusRoute(fakeRequest, fakeResponse);
    });

    it('should respond with a "200" status code', () => {
      expect(fakeResponse.status).to.be.calledWith(200);
    });

    it('should respond with an OK message', () => {
      expect(fakeResponse.json).to.be.calledWith({ statusCode: 200, message: 'OK' });
    });

  });
});
