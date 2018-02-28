import { parse, format, MethodNotFound, JsonRpcError } from 'json-rpc-protocol'

export default class JsonRpcPeer {
  constructor (send, handlers) {
    Object.assign(this, { send, handlers })
    this.id = 0
    this.pendingRequests = {}
  }

  async processMessage (rawMessage) {
    let message
    try {
      message = parse(rawMessage)
    } catch (e) {
      this.send(format.error(message.id, e))
      return
    }
    if (message.method && !this.handlers[message.method]) {
      this.send(format.error(message.id, new MethodNotFound(message.method)))
      return
    }
    switch (message.type) {
      case 'notification':
        this.handlers[message.method](...message.params)
        break
      case 'request':
        let response
        try {
          response = format.response(
            message.id,
            await this.handlers[message.method](...message.params))
        } catch (e) {
          response = format.error(message.id, new JsonRpcError())
        }
        this.send(response)
        break
      case 'response':
        if (!this.pendingRequests[message.id]) {
          throw new Error(`Can't find request with id: ${message.id}`)
        }
        this.pendingRequests[message.id].resolve(message.result)
        delete this.pendingRequests[message.id]
        break
      case 'error':
        if (!this.pendingRequests[message.id]) {
          throw new Error(`Can't find request with id: ${message.id}`)
        }
        this.pendingRequests[message.id].reject(message.error)
        delete this.pendingRequests[message.id]
        break
    }
  }

  call (methodName, ...args) {
    const id = ++this.id
    this.send(format.request(id, methodName, args))
    return new Promise((resolve, reject) => {
      this.pendingRequests[id] = { resolve, reject }
    })
  }

  notification (methodName, ...args) {
    this.send(format.notification(methodName, args))
  }

  failPendingRequests (error) {
    Object.values[this.pendingRequests].forEach(p => p.reject(error))
  }
}
