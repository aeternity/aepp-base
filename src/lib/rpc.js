const NOTIFICATION = 'notification';
const REQUEST = 'request';
const RESPONSE = 'response';
const ERROR = 'error';

export default class RpcPeer {
  constructor(send, handlers = {}) {
    Object.assign(this, { send, handlers });
    this.id = 0;
    this.pendingRequests = {};
  }

  processMessage(message) {
    return [NOTIFICATION, REQUEST].includes(message.type)
      ? this.processRequestMessage(message)
      : this.processResponseMessage(message);
  }

  async processRequestMessage(message) {
    if (!this.handlers[message.method]) {
      this.send({
        id: message.id,
        error: 'Method not found',
      });
      return;
    }
    switch (message.type) {
      case NOTIFICATION:
        this.handlers[message.method](...message.params);
        break;
      case REQUEST: {
        const response = { id: message.id };
        try {
          response.result = await this.handlers[message.method](...message.params);
          response.type = RESPONSE;
        } catch (e) {
          response.error = e.toString();
          response.type = ERROR;
        }
        this.send(response);
        break;
      }
      default:
        throw new Error(`Invalid request message type: '${message.type}'`);
    }
  }

  processResponseMessage(message) {
    if (!this.pendingRequests[message.id]) {
      throw new Error(`Can't find request with id: ${message.id}`);
    }
    switch (message.type) {
      case RESPONSE:
        this.pendingRequests[message.id].resolve(message.result);
        break;
      case ERROR:
        this.pendingRequests[message.id].reject(new Error(message.error));
        break;
      default:
        throw new Error(`Invalid response message type: '${message.type}'`);
    }
    delete this.pendingRequests[message.id];
  }

  call(method, ...params) {
    this.id += 1;
    const { id } = this;
    this.send({
      id, type: REQUEST, method, params,
    });
    return new Promise((resolve, reject) => {
      this.pendingRequests[id] = { resolve, reject };
    });
  }

  notification(method, ...params) {
    this.send({ type: NOTIFICATION, method, params });
  }
}
