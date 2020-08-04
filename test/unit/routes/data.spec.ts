// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

// Setup requirements for this test
import * as express from 'express';
import api from './../../../src/routes/data';

describe('Unit: src/routes/data', () => {
    let fakeApp;

    beforeEach(() => {
        fakeApp = express();
        sinon.spy(fakeApp, 'post');

        api(fakeApp);
    });

    afterEach(() => {
        fakeApp = undefined;
    });

    describe('When the routes are setup', () => {
        it('should add the data route', () => {
            expect(fakeApp.post).to.have.been.calledWith('/api/data');
        });
    });
});