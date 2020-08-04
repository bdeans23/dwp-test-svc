// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import configMiddleware from './../../../src/middleware/configMiddleware';

describe('Unit: src/middleware/config', () => {
    let fakeConfig;
    let fakeRequest;
    let fakeResponse;
    let fakeNext;

    beforeEach(() => {
        fakeConfig = { name: 'FakeConfig' };
        fakeRequest = {};
        fakeRequest.headers = {};
        fakeResponse = {};
        fakeNext =  sinon.stub();

        configMiddleware(fakeConfig)(fakeRequest, fakeResponse, fakeNext);
    });

    it('should attach the config to the request', () => {
        expect(fakeRequest.config).to.be.equal(fakeConfig);
    });

    it('should call next', () => {
        expect(fakeNext).to.have.been.called;
    });
});
