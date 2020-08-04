// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import validationMiddleware from './../../../src/middleware/schemaValidationMiddleware';
const Joi = require('joi');

describe('Unit: src/middleware/schemaValidation', () => {
    let fakeRequest;
    let fakeResponse;
    let fakeNext;
    let fakeError;
    let schema;

    beforeEach(() => {
        fakeRequest = {
            body: {
                cityName: 'TestCity',
            }
        };

        fakeResponse = {};
        fakeError = sinon.stub();
        fakeNext = sinon.spy((err) => {
            if (err) fakeError(err);
        });

        schema = {
            body: Joi.object().keys({
                id: Joi.number().required(),
                name: Joi.string()
            })
        };
    });

    it('should call next', () => {
        validationMiddleware(schema)(fakeRequest, fakeResponse, fakeNext);
        expect(fakeNext).to.have.been.called;
    });

    it('should error if next', () => {
        fakeRequest.body.id = 'a string';
        validationMiddleware(schema)(fakeRequest, fakeResponse, fakeNext);
        expect(fakeError).to.have.been.called;
    });
});