const NOTIFICATION = 'notification';
const REQUEST = 'request';
const REQUEST_CANCEL = 'request-cancel';
const RESPONSE = 'response';
const ERROR = 'error';

const abortable = Symbol('abortable');

export const markAbortable = (func) => {
  const f = func.bind({});
  f[abortable] = true;
  return f;
};

export default class RpcPeer {
  #id = 0;

  #pendingRequests = {};

  #responseControllers = {};

  #send;

  #handlers = {};

  constructor(send, handlers = {}) {
    this.#send = send;
    this.#handlers = handlers;
  }

  processMessage(message) {
    if (message.type === REQUEST_CANCEL) {
      const controller = this.#responseControllers[message.id];
      if (!controller) {
        this.#send({ id: message.id, error: 'Can\'t cancel request: its abort controller not found' });
        return undefined;
      }
      controller.abort();
      return undefined;
    }
    return [NOTIFICATION, REQUEST].includes(message.type)
      ? this.#processRequestMessage(message)
      : this.#processResponseMessage(message);
  }

  async #processRequestMessage(message) {
    if (!this.#handlers[message.method]) {
      this.#send({
        id: message.id,
        error: 'Method not found',
      });
      return;
    }
    switch (message.type) {
      case NOTIFICATION:
        this.#handlers[message.method](...message.params);
        break;
      case REQUEST: {
        const response = { id: message.id };
        let controller;
        try {
          const params = [...message.params];
          const handler = this.#handlers[message.method];
          if (handler[abortable]) {
            params.length = handler.length;
            controller = new AbortController();
            params[params.length - 1] = controller.signal;
            this.#responseControllers[message.id] = controller;
          }
          response.result = await handler(...params);
          response.type = RESPONSE;
        } catch (error) {
          if (controller?.signal.aborted) return;
          response.error = error.message;
          response.type = ERROR;
        } finally {
          delete this.#responseControllers[message.id];
        }
        this.#send(response);
        break;
      }
      default:
        throw new Error(`Invalid request message type: '${message.type}'`);
    }
  }

  #processResponseMessage(message) {
    if (!this.#pendingRequests[message.id]) {
      throw new Error(`Can't find request with id: ${message.id}`);
    }
    switch (message.type) {
      case RESPONSE:
        this.#pendingRequests[message.id].resolve(message.result);
        break;
      case ERROR:
        this.#pendingRequests[message.id].reject(new Error(message.error));
        break;
      default:
        throw new Error(`Invalid response message type: '${message.type}'`);
    }
    delete this.#pendingRequests[message.id];
  }

  call(methodOrObj, ...params) {
    const method = typeof methodOrObj === 'string' ? methodOrObj : methodOrObj.method;
    this.#id += 1;
    const id = this.#id;
    this.#send({
      id, type: REQUEST, method, params,
    });
    let abort;
    return new Promise((resolve, reject) => {
      abort = () => {
        this.#send({ id, type: REQUEST_CANCEL });
        delete this.#pendingRequests[id];
        reject(new Error('Request aborted'));
      };
      methodOrObj.signal?.addEventListener('abort', abort);
      this.#pendingRequests[id] = { resolve, reject };
    }).finally(() => methodOrObj.signal?.removeEventListener('abort', abort));
  }

  cancelCall(id) {
    this.#send({ id, type: REQUEST_CANCEL });
    delete this.#pendingRequests[id];
  }

  notification(method, ...params) {
    this.#send({ type: NOTIFICATION, method, params });
  }
}
