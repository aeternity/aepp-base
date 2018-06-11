import { noop } from 'lodash'
import RPC from '../rpc'

const testMethodName = 'test-method-name'
const testArgs = ['test', 'args']

describe('notifications', () => {
  const testNotification = {
    type: 'notification',
    method: testMethodName,
    params: testArgs
  }

  it('sends', () => {
    const messageHandler = jest.fn()
    const client = new RPC(messageHandler)
    client.notification(testMethodName, ...testArgs)
    expect(messageHandler).toHaveBeenCalledWith(testNotification)
  })

  it('processes', async () => {
    const notificationHandler = jest.fn()
    const server = new RPC(noop, {
      [testMethodName]: notificationHandler
    })
    await server.processMessage(testNotification)
    expect(notificationHandler).toHaveBeenCalledWith(...testArgs)
  })
})

describe('calls', () => {
  const testRequest = {
    type: 'request',
    id: 1,
    method: testMethodName,
    params: testArgs
  }
  const testResult = 'test-result'
  const testResponse = {
    type: 'response',
    id: 1,
    result: testResult
  }
  const testError = 'test-error'
  const testErrorResponse = {
    type: 'error',
    id: 1,
    error: testError
  }

  describe('client', () => {
    it('sends request', () => {
      const messageHandler = jest.fn()
      const client = new RPC(messageHandler)
      client.call(testMethodName, ...testArgs)
      expect(messageHandler).toHaveBeenCalledWith(testRequest)
    })

    it('receives response', () => {
      const client = new RPC(noop)
      const promise = client.call(testMethodName, ...testArgs)
      client.processMessage(testResponse)
      expect(promise).resolves.toBe(testResult)
    })

    it('receives exception', () => {
      const client = new RPC(noop)
      const promise = client.call(testMethodName, ...testArgs)
      client.processMessage(testErrorResponse)
      expect(promise).rejects.toThrow(testError)
    })

    it('throws error if response with invalid id', async () => {
      const client = new RPC(noop)
      expect(() => client.processMessage(testResponse))
        .toThrow('Can\'t find request with id')
    })

    it('throws error if message type is invalid', async () => {
      const client = new RPC(noop)
      client.call(testMethodName, ...testArgs)
      expect(() => client.processMessage({ id: 1, type: 'invalid' }))
        .toThrow('Invalid response message type')
    })
  })

  describe('server', () => {
    it('process request', async () => {
      const requestHandler = jest.fn()
      const server = new RPC(noop, {
        [testMethodName]: requestHandler
      })
      await server.processMessage(testRequest)
      expect(requestHandler).toHaveBeenCalledWith(...testArgs)
    })

    it('sends response', async () => {
      const messageHandler = jest.fn()
      const server = new RPC(messageHandler, {
        [testMethodName]: () => testResult
      })
      await server.processMessage(testRequest)
      expect(messageHandler).toHaveBeenCalledWith(testResponse)
    })

    it('sends exception', async () => {
      const messageHandler = jest.fn()
      const server = new RPC(messageHandler, {
        [testMethodName] () {
          throw testError
        }
      })
      await server.processMessage(testRequest)
      expect(messageHandler).toHaveBeenCalledWith(testErrorResponse)
    })

    it('sends error if method not found', async () => {
      const messageHandler = jest.fn()
      const server = new RPC(messageHandler)
      await server.processMessage(testRequest)
      expect(messageHandler).toHaveBeenCalledWith({
        id: 1,
        error: 'Method not found'
      })
    })
  })
})
