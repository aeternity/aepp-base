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
    if (event.data.method === 'getAccounts') {
      this.getAccounts(event)
    } else if (event.data.method === 'signTransaction') {
      this.signTransaction(event)
    } else if (event.data.method === 'signPersonalMessage') {
      this.signPersonalMessage(event)
    } else if (event.data.method === 'handShake') {
      this.handShake(event)
    }
  }

  getAccounts (event) {
    let accounts = []
    if (this.store.getters.activeIdentity.address) {
      accounts.push(this.store.getters.activeIdentity.address)
    }
    event.source.postMessage({
      uuid: event.data.uuid,
      method: 'getAccountsReturn',
      payload: accounts
    }, '*')
  }

  async signTransaction (event) {
    let tx = event.data.payload
    try {
      let result = await this.store.dispatch('signTransaction', {tx: tx, appName: event.origin})
      event.source.postMessage({
        uuid: event.data.uuid,
        method: 'signTransactionReturn',
        error: null,
        payload: result
      }, '*')
    } catch (e) {
      /* handle error */
      e = JSON.parse(JSON.stringify(e))
      event.source.postMessage({
        uuid: event.data.uuid,
        method: 'signTransactionReturn',
        error: e,
        payload: null
      }, '*')
    }
  }
  async signPersonalMessage (event) {
    let msg = event.data.payload
    try {
      let result = await this.store.dispatch('signPersonalMessage', {msg: msg, appName: event.origin})
      event.source.postMessage({
        uuid: event.data.uuid,
        method: 'signPersonalMessageReturn',
        error: null,
        payload: result
      }, '*')
    } catch (e) {
      /* handle error */
      console.log('e', e)
      event.source.postMessage({
        uuid: event.data.uuid,
        method: 'signPersonalMessageReturn',
        error: e,
        payload: null
      }, '*')
    }
  }

  handShake (event) {
    event.source.postMessage({
      uuid: event.data.uuid,
      method: 'handShakeReturn',
      payload: null
    }, '*')
  }
}

export default PostMessageHandler
