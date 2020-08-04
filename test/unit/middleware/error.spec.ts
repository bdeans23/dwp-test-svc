// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import errorMiddleware from './../../../src/middleware/errorMiddleware';
import UnauthorizedError from './../../../src/errors/UnauthorizedError';
import ForbiddenError from './../../../src/errors/ForbiddenError';
import ValidationError from './../../../src/errors/ValidationError';
import ConflictError from './../../../src/errors/ConflictError';
import NotFoundError from './../../../src/errors/NotFoundError';
import NotImplementedError from './../../../src/errors/NotImplementedError';


describe('Unit: src/middleware/error', () => {
    let fakeConfig;
    let fakeRequest;
    let fakeResponse;
    let fakeNext;

    beforeEach(() => {
        fakeRequest = {
            user: 'unknown',
            headers: {
                host: 'fake-host',
            },
            url: 'fake-destination',
            method: 'fake-method',
            log: {
                error: sinon.mock()
            }
        };
        fakeNext =  sinon.stub();

        fakeResponse = { boom: {}};
        fakeResponse.boom.badImplementation = sinon.stub();
        fakeResponse.boom.unauthorized = sinon.stub();
        fakeResponse.boom.forbidden = sinon.stub();
        fakeResponse.boom.badRequest = sinon.stub();
        fakeResponse.boom.conflict = sinon.stub();
        fakeResponse.boom.notFound = sinon.stub();
        fakeResponse.boom.notImplemented = sinon.stub();

    });

    describe('When running in the "development" environment', () => {
        beforeEach(() => {
            fakeConfig = { NODE_ENV: 'development' };
        });

        describe('When an "UnauthorizedError" is given', () => {
            let unauthorizedError;

            beforeEach(() => {
                unauthorizedError = new UnauthorizedError('fake-message');
                errorMiddleware(fakeConfig)(unauthorizedError, fakeRequest, fakeResponse, fakeNext);
            });

            it('should use an unauthorized response', () => {
                expect(fakeResponse.boom.unauthorized).to.have.been.calledWith('fake-message');
            });

            it('should call next with the error', () => {
                expect(fakeNext).to.have.been.calledWith(unauthorizedError);
            });
        });

        describe('When an "ForbiddenError" is given', () => {
            let forbiddenError;

            beforeEach(() => {
                forbiddenError = new ForbiddenError('fake-message');
                errorMiddleware(fakeConfig)(forbiddenError, fakeRequest, fakeResponse, fakeNext);
            });

            it('should use an unauthorized response', () => {
                expect(fakeResponse.boom.forbidden).to.have.been.calledWith('fake-message');
            });

            it('should call next with the error', () => {
                expect(fakeNext).to.have.been.calledWith(forbiddenError);
            });
        });

        describe('When an "ValidationError" is given', () => {
            let validationError;

            beforeEach(() => {
                validationError = new ValidationError('fake-message');
                errorMiddleware(fakeConfig)(validationError, fakeRequest, fakeResponse, fakeNext);
            });

            it('should use an bad request response', () => {
                expect(fakeResponse.boom.badRequest).to.have.been.calledWith('fake-message');
            });

            it('should call next with the error', () => {
                expect(fakeNext).to.have.been.calledWith(validationError);
            });
        });

        describe('When an "ConflictError" is given', () => {
            let conflictError;

            beforeEach(() => {
                conflictError = new ConflictError('fake-message');
                errorMiddleware(fakeConfig)(conflictError, fakeRequest, fakeResponse, fakeNext);
            });

            it('should use a conflict response', () => {
                expect(fakeResponse.boom.conflict).to.have.been.calledWith('fake-message');
            });

            it('should call next with the error', () => {
                expect(fakeNext).to.have.been.calledWith(conflictError);
            });
        });

        describe('When an "NotFoundError" is given', () => {
            let notFoundError;

            beforeEach(() => {
                notFoundError = new NotFoundError('fake-message');
                errorMiddleware(fakeConfig)(notFoundError, fakeRequest, fakeResponse, fakeNext);
            });

            it('should use a not found response', () => {
                expect(fakeResponse.boom.notFound).to.have.been.calledWith('fake-message');
            });

            it('should call next with the error', () => {
                expect(fakeNext).to.have.been.calledWith(notFoundError);
            });
        });

        describe('When an "NotImplementedError" is given', () => {
            let notImplementedError;

            beforeEach(() => {
                notImplementedError = new NotImplementedError('fake-message');
                errorMiddleware(fakeConfig)(notImplementedError, fakeRequest, fakeResponse, fakeNext);
            });

            it('should use a not implemented response', () => {
                expect(fakeResponse.boom.notImplemented).to.have.been.calledWith('fake-message');
            });

            it('should call next with the error', () => {
                expect(fakeNext).to.have.been.calledWith(notImplementedError);
            });
        });

        describe('When an "Error" is given', () => {
            let error;

            beforeEach(() => {
                error = new Error('fake-message');
                errorMiddleware(fakeConfig)(error, fakeRequest, fakeResponse, fakeNext);
            });

            it('should use an bad request response', () => {
                expect(fakeResponse.boom.badImplementation).to.have.been.calledWith('fake-message');
            });

            it('should call next with the error', () => {
                expect(fakeNext).to.have.been.calledWith(error);
            });
        });
    });

    describe('When running any other environment', () => {
        beforeEach(() => {
            fakeConfig = { NODE_ENV: 'production' };
        });

        describe('When an "UnauthorizedError" is given', () => {
            let unauthorizedError;

            beforeEach(() => {
                unauthorizedError = new UnauthorizedError('fake-message');
                errorMiddleware(fakeConfig)(unauthorizedError, fakeRequest, fakeResponse, fakeNext);
            });

            it('should use an unauthorized response', () => {
                expect(fakeResponse.boom.unauthorized).to.have.been.calledWith('fake-message');
            });

            it('should call next with the error', () => {
                expect(fakeNext).to.have.been.calledWith(unauthorizedError);
            });
        });

        describe('When an "ValidationError" is given', () => {
            let validationError;

            beforeEach(() => {
                validationError = new ValidationError('fake-message');
                errorMiddleware(fakeConfig)(validationError, fakeRequest, fakeResponse, fakeNext);
            });

            it('should use an bad request response', () => {
                expect(fakeResponse.boom.badRequest).to.have.been.calledWith('fake-message');
            });

            it('should call next with the error', () => {
                expect(fakeNext).to.have.been.calledWith(validationError);
            });
        });

        describe('When an "Error" is given', () => {
            let error;

            beforeEach(() => {
                error = new Error('fake-message');
                errorMiddleware(fakeConfig)(error, fakeRequest, fakeResponse, fakeNext);
            });

            it('should use an bad request response', () => {
                expect(fakeResponse.boom.badImplementation).to.have.been.calledWith('fake-message');
            });

            it('should call next with the error', () => {
                expect(fakeNext).to.have.been.calledWith(error);
            });
        });
    });
});