// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

// Setup requirements for this test
import config from './../../src/config';
const fs = require('fs');

describe('Unit: src/config', () => {
    let fakeConfig;

    const env = {
        APP_NAME: 'fake-app-name',
        NODE_ENV: 'fake-node-env',
        APP_PORT: 3000
    };

    beforeEach(() => {
        sinon.stub(fs, 'readFileSync');
        fakeConfig = config(env);
    });

    afterEach(() => {
        fs.readFileSync.restore();
        fakeConfig = {};
    });

    it('should be defined', () => {
        expect(fakeConfig).to.be.an('object');
    });

    Object.keys(env).forEach((key) => {
        it(`should have ${key}`, () => {
            expect(fakeConfig[key]).to.be.equal(env[key]);
        });
    });
});