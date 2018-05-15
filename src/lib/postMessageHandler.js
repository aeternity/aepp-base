class PostMessageHandler {
  constructor (store) {
    this.store = store
  }

  registerListener () {
    window.addEventListener('message', event => this.receiveMessage(event), false)
  }

  async receiveMessage (event) {
    if (!event.data.uuid) {
      // this message isnt meant for us
      return
    }
    const sendsReply = ['getAccounts', 'signTransaction', 'signPersonalMessage', 'handShake']
    if (sendsReply.includes(event.data.method)) {
      await this.sendReplyMessage(this[event.data.method].bind(this), event)
    }
  }

  async sendReplyMessage (method, event) {
    let error = null
    let payload = null
    try {
      payload = await method(event)
    } catch (e) {
      error = e.toString()
    }
    event.source.postMessage({
      uuid: event.data.uuid,
      method: `${event.data.method}Return`,
      error,
      payload
    }, '*')
  }

  getAccounts () {
    let accounts = []
    if (this.store.getters.activeIdentity.address) {
      accounts.push(this.store.getters.activeIdentity.address)
    }
    return accounts
  }

  signTransaction (event) {
    let tx = event.data.payload
    return this.store.dispatch('signTransaction', {tx: tx, appName: event.origin})
  }
  signPersonalMessage (event) {
    let msg = event.data.payload
    return this.store.dispatch('signPersonalMessage', {msg: msg, appName: event.origin})
  }

  handShake () {
    return null
  }
}

export default PostMessageHandler
