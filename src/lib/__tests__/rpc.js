import { noop } from 'lodash-es';
import Promise from 'bluebird';
import RPC from '../rpc';

Promise.config({ cancellation: true });
const testMethodName = 'test-method-name';
const testArgs = ['test', 'args'];

describe('notifications', () => {
  const testNotification = {
    type: 'notification',
    method: testMethodName,
    params: testArgs,
  };

  it('sends', () => {
    const messageHandler = jest.fn();
    const client = new RPC(messageHandler);
    client.notification(testMethodName, ...testArgs);
    expect(messageHandler).toHaveBeenCalledWith(testNotification);
  });

  it('processes', async () => {
    const notificationHandler = jest.fn();
    const server = new RPC(noop, {
      [testMethodName]: notificationHandler,
    });
    await server.processMessage(testNotification);
    expect(notificationHandler).toHaveBeenCalledWith(...testArgs);
  });
});

describe('calls', () => {
  const testRequest = {
    type: 'request',
    id: 1,
    method: testMethodName,
    params: testArgs,
  };
  const testRequestCancel = {
    type: 'request-cancel',
    id: 1,
  };
  const testResult = 'test-result';
  const testResponse = {
    type: 'response',
    id: 1,
    result: testResult,
  };
  const testError = 'test-error';
  const testErrorResponse = {
    type: 'error',
    id: 1,
    error: testError,
  };

  describe('client', () => {
    it('sends request', () => {
      const messageHandler = jest.fn();
      const client = new RPC(messageHandler);
      client.call(testMethodName, ...testArgs);
      expect(messageHandler).toHaveBeenCalledWith(testRequest);
    });

    it('cancels request', (done) => {
      const messageHandler = jest.fn((data) => {
        expect(data).toEqual(
          messageHandler.mock.calls.length === 1 ? testRequest : testRequestCancel,
        );
        if (messageHandler.mock.calls.length === 2) done();
      });
      const client = new RPC(messageHandler);
      const promise = client.call(testMethodName, ...testArgs);
      promise.cancel();
    });

    it('receives response', () => {
      const client = new RPC(noop);
      const promise = client.call(testMethodName, ...testArgs);
      client.processMessage(testResponse);
      expect(promise).resolves.toBe(testResult);
    });

    it('receives exception', () => {
      const client = new RPC(noop);
      const promise = client.call(testMethodName, ...testArgs);
      client.processMessage(testErrorResponse);
      expect(promise).rejects.toThrow(testError);
    });

    it('throws error if response with invalid id', async () => {
      const client = new RPC(noop);
      expect(() => client.processMessage(testResponse))
        .toThrow('Can\'t find request with id');
    });

    it('throws error if message type is invalid', async () => {
      const client = new RPC(noop);
      client.call(testMethodName, ...testArgs);
      expect(() => client.processMessage({ id: 1, type: 'invalid' }))
        .toThrow('Invalid response message type');
    });
  });

  describe('server', () => {
    it('process request', async () => {
      const requestHandler = jest.fn();
      const server = new RPC(noop, {
        [testMethodName]: requestHandler,
      });
      await server.processMessage(testRequest);
      expect(requestHandler).toHaveBeenCalledWith(...testArgs);
    });

    it('cancels request', () => {
      const requestPromise = new Promise(noop);
      const server = new RPC(noop, {
        [testMethodName]: () => requestPromise,
      });
      server.processMessage(testRequest);
      server.processMessage(testRequestCancel);
      expect(requestPromise.isCancelled()).toBe(true);
    });

    it('sends response', async () => {
      const messageHandler = jest.fn();
      const server = new RPC(messageHandler, {
        [testMethodName]: () => testResult,
      });
      await server.processMessage(testRequest);
      expect(messageHandler).toHaveBeenCalledWith(testResponse);
    });

    it('sends exception', async () => {
      const messageHandler = jest.fn();
      const server = new RPC(messageHandler, {
        [testMethodName]() {
          throw testError;
        },
      });
      await server.processMessage(testRequest);
      expect(messageHandler).toHaveBeenCalledWith(testErrorResponse);
    });

    it('sends error if method not found', async () => {
      const messageHandler = jest.fn();
      const server = new RPC(messageHandler);
      await server.processMessage(testRequest);
      expect(messageHandler).toHaveBeenCalledWith({
        id: 1,
        error: 'Method not found',
      });
    });

    it('sends error if cancelling not existing request', () => {
      const messageHandler = jest.fn();
      const server = new RPC(messageHandler);
      server.processMessage(testRequestCancel);
      expect(messageHandler).toHaveBeenCalledWith({
        id: testRequestCancel.id,
        error: 'Can\'t cancel request: it\'s not found',
      });
    });
  });
});
