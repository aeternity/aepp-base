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
      await this.sendReplyMessage(this[event.data.method], event)
    }
  }

  async sendReplyMessage (method, event) {
    let error = null
    let payload = null
    try {
      payload = await method(event)
    } catch (e) {
      error = e
    }
    event.source.postMessage({
      uuid: event.data.uuid,
      method: `${event.data.method}Return`,
      error,
      payload
    }, '*')
  }

  getAccounts (event) {
    let accounts = []
    if (this.store.getters.activeIdentity.address) {
      accounts.push(this.store.getters.activeIdentity.address)
    }
    return accounts
  }

  async signTransaction (event) {
    let tx = event.data.payload
    try {
      return await this.store.dispatch('signTransaction', {tx: tx, appName: event.origin})
    } catch (e) {
      /* handle error */
      throw JSON.parse(JSON.stringify(e))
    }
  }
  async signPersonalMessage (event) {
    let msg = event.data.payload
    try {
      return await this.store.dispatch('signPersonalMessage', {msg: msg, appName: event.origin})
    } catch (e) {
      /* handle error */
      console.log('e', e)
      throw e
    }
  }

  handShake () {
    return null
  }
}

export default PostMessageHandler
