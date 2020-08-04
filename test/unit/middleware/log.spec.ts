// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import logMiddleware from './../../../src/middleware/logMiddleware';

describe('Unit: src/middleware/log', () => {
    let fakeLog;
    let fakeRequest;
    let fakeResponse;
    let fakeNext;

    beforeEach(() => {
        fakeLog = { name: 'FakeLog'};
        fakeRequest = {};
        fakeRequest.headers = {};
        fakeResponse = {};
        fakeNext =  sinon.stub();

        logMiddleware(fakeLog)(fakeRequest, fakeResponse, fakeNext);
    });

    it('should attach the log to the request', () => {
        expect(fakeRequest.log).to.be.equal(fakeLog);
    });

    it('should call next', () => {
        expect(fakeNext).to.have.been.called;
    });
});
