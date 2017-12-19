import MetadataStorage from './metadataStorage'

class PostMessageHandler {
  constructor (store) {
    this.store = store
    this.metadataStorage = new MetadataStorage()
  }

  registerListener () {
    window.addEventListener('message', event => this.receiveMessage(event), false)
  }

  async receiveMessage (event) {
    // let skipSecurity = process.env.NODE_ENV === 'development'
    let skipSecurity = true // for hackathon
    if (!event.data.uuid) {
      // this message isnt meant for us
      return
    }
    let regex = new RegExp('^https?:\/\/.*\.aepps\.(?:com|dev)$')
    let regexLocal = new RegExp('^https?:\/\/localhost(?::\\d+)?$')
    let regexNgrok = new RegExp('^https?:\/\/.*\.ngrok\.io$')
    if (!skipSecurity && !regex.test(event.origin) && !regexLocal.test(event.origin) && !regexNgrok.test(event.origin)) {
      // not of any of any of our authorized apps
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
    } else if (event.data.method === 'storeMetadata') {
      this.storeMetadata(event)
    } else if (event.data.method === 'readMetadata') {
      this.readMetadata(event)
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

  async storeMetadata (event) {
    let msg = event.data.payload

    let namespace = event.origin
    let key = msg.key
    let value = msg.value

    let success = this.metadataStorage.storeMetadata(namespace, key, value)
    event.source.postMessage({
      uuid: event.data.uuid,
      method: 'storeMetadataReturn',
      payload: {
        success: success
      }
    }, '*')
  }

  async readMetadata (event) {
    let msg = event.data.payload
    let namespace = event.origin
    let key = msg
    let storedValue = this.metadataStorage.readMetadata(namespace, key)
    event.source.postMessage({
      uuid: event.data.uuid,
      method: 'readMetadataReturn',
      payload: {
        success: true,
        key: key,
        value: storedValue
      }
    }, '*')
  }
}

export default PostMessageHandler
