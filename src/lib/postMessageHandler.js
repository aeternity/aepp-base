import MetadataStorage from './metadataStorage'
import { BaseError } from './errors'

class PostMessageHandler {
  constructor (store) {
    this.store = store
    // this.metadataStorage = new MetadataStorage()
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
    } else if (event.data.method === 'storeMetadata') {
      this.storeMetadata(event)
    } else if (event.data.method === 'readMetadata') {
      this.readMetadata(event)
    } else if (event.data.method === 'requestPermissions') {
      this.requestPermissions(event)
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

    let requestingNamespace = event.origin
    let requestedNamespace = msg.namespace || requestingNamespace
    let key = msg.key
    let value = msg.value
    let metadataVersion = msg.metadataVersion || null
    let metadataStorage = new MetadataStorage({metadataVersion: metadataVersion})
    try {
      let result = metadataStorage.storeMetadata(requestingNamespace, requestedNamespace, key, value)
      event.source.postMessage({
        uuid: event.data.uuid,
        method: 'storeMetadataReturn',
        payload: {
          success: result
        }
      }, '*')
    } catch (e) {
      this.sendError(event, e)
    }
  }

  async readMetadata (event) {
    let msg = event.data.payload
    let requestingNamespace = event.origin
    let requestedNamespace = msg.namespace || requestingNamespace
    let key = msg.key
    let metadataVersion = msg.metadataVersion || null
    let metadataStorage = new MetadataStorage({metadataVersion: metadataVersion})
    try {
      let storedValue = metadataStorage.readMetadata(requestingNamespace, requestedNamespace, key)
      event.source.postMessage({
        uuid: event.data.uuid,
        method: 'readMetadataReturn',
        payload: {
          success: true,
          key: key,
          value: storedValue
        }
      }, '*')
    } catch (e) {
      this.sendError(event, e)
    }
  }

  async requestPermissions (event) {
    let msg = event.data.payload
    let requestingNamespace = event.origin
    let requestedPermissions = msg
    let metadataStorage = new MetadataStorage()

    let missingPermissions = metadataStorage.checkMissingPermissions(requestingNamespace, requestedPermissions)
    let normalizedPermissions = metadataStorage.normalizePermissionJson(missingPermissions)
    if (confirm('You want to give the app ' + requestingNamespace + ' the following permissions? \n\n ' + JSON.stringify(normalizedPermissions, null, 4))) {
      let result = metadataStorage.grantPermissions(requestingNamespace, normalizedPermissions)
      event.source.postMessage({
        uuid: event.data.uuid,
        method: 'requestPermissionsReturn',
        payload: {
          success: true,
          result: result
        }
      }, '*')
    } else {
      event.source.postMessage({
        uuid: event.data.uuid,
        method: 'requestPermissionsReturn',
        payload: {
          success: false
        }
      }, '*')
    }
  }

  sendError (event, error) {
    console.log(error)
    let errorToSend = JSON.parse(JSON.stringify(error))
    event.source.postMessage({
      uuid: event.data.uuid,
      payload: {
        success: false,
        error: errorToSend
      }
    }, '*')
  }
}

export default PostMessageHandler
