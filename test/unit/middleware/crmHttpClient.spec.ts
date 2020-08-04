// tslint:disable
// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import * as requestPromise from 'request-promise';
// Setup testing tools
import dwpHttpClient from '../../../src/middleware/dwpHttpClientMiddleware';

describe('Unit: src/middleware/dwpHttpClientMiddleware', () => {
  let req: any;
  let response: any;
  let next: any;

  beforeEach(() => {
    req = {
      config: {
        API_URL: 'test',
        API_PATH: 'test-path'
      },
    };

    response = {};
    next = sinon.stub();
  });

  it('should attach http client', async () => {
    expect(req.dwpClient).to.not.exist;
    await dwpHttpClient(req, response, next);
    expect(req.dwpClient).to.exist;
  });

  it('should attach defaults', async () => {
    const spy = sinon.spy(requestPromise, 'defaults');
    await dwpHttpClient(req, response, next);
    expect(spy).to.have.been.called;
    (requestPromise.defaults as any).restore();
  });

  it('should call next', async () => {
    await dwpHttpClient(req, response, next);
    expect(next).to.have.been.called;
  });
});
