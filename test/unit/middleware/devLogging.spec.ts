// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const devLogging = require('./../../../src/middleware/devLoggingMiddleware');

describe('Unit: src/middleware/devLogging', () => {
    let fakeEnv;

    beforeEach(() => {
        devLogging.getMorgan = sinon.spy(devLogging.getMorgan);
    });

    it('should call getMorgan with the parameter dev in the development environment', () => {
        fakeEnv = { NODE_ENV : 'development' };
        devLogging.default(fakeEnv);
        expect(devLogging.getMorgan).to.have.been.calledWith('dev');
    });

    it('should call getMorgan with the parameter common in any other environment', () => {
        fakeEnv = { NODE_ENV : 'production' };
        devLogging.default(fakeEnv);
        expect(devLogging.getMorgan).to.have.been.calledWith('common');
    });

});
