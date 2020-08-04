// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import ioLogging from './../../../src/middleware/ioLoggingMiddleware';

describe('Unit: src/middleware/ioLogging', () => {
    let fakeLog;
    let fakeRequest;
    let fakeResponse;
    let fakeNext;

    beforeEach(() => {
        fakeLog = {};
        fakeLog.info = sinon.stub();
        fakeRequest = {};
        fakeRequest.headers = {
            host: 'localhost'
        };
        fakeRequest.url = 'boilerplate';
        fakeRequest.method = 'Get';
        fakeRequest.log = fakeLog;

        fakeResponse = {};
        fakeResponse.on = sinon.spy(function(event, cd) {
            cd();
        });

        fakeNext = sinon.stub();
        ioLogging(fakeRequest, fakeResponse, fakeNext);
    });

    it('should call req.on', () => {
        expect(fakeResponse.on).to.have.been.calledWith('finish');
    });

    it('should call log info', () => {
        expect(fakeLog.info).to.have.been.called;
    });

    it('should call next', () => {
        expect(fakeNext).to.have.been.called;
    });
});
