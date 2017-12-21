const Url = require('url')
import { MissingPermissionError } from './errors'

class MetadataStorage {
  // TODO: @schema type?
  // TODO: function to check missing permissions
  // TODO: version string
  // TODO: get whole namespace?

  constructor () {
    this.storage = localStorage
    this.keyword = 'metadata'
    this.permissionKeyword = 'metadataPermissions'
    this.identityNamespace = 'identity.aepps.com'
  }

  grantPermissions (requestingNamespace, requestedPermissions) {
    requestingNamespace = this.cleanNamespace(requestingNamespace)
    console.log('grantPermissions', requestingNamespace, requestedPermissions)
    try {
      let currentPermissionsRaw = this.storage.getItem(this.permissionKeyword)
      let currentPermissions = {}
      if (currentPermissionsRaw) {
        currentPermissions = JSON.parse(currentPermissionsRaw)
      }

      for (const [requestedNamespace, requestedKeys] of Object.entries(requestedPermissions)) {
        if (!currentPermissions[requestingNamespace]) {
          currentPermissions[requestingNamespace] = {}
        }
        currentPermissions[requestingNamespace] = this.grantPermissionsForNamespace(currentPermissions[requestingNamespace], requestingNamespace, requestedNamespace, requestedKeys)
      }
      this.storage.setItem(this.permissionKeyword, JSON.stringify(currentPermissions))
      console.log('stored Permissions', currentPermissions)
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  grantPermissionsForNamespace (existingPermissionsNamespace, requestingNamespace, requestedNamespace, requestedKeys) {
    if (!existingPermissionsNamespace[requestedNamespace]) {
      existingPermissionsNamespace[requestedNamespace] = {}
    }
    for (const [keyName, keyProps] of Object.entries(requestedKeys)) {
      if (!existingPermissionsNamespace[requestedNamespace][keyName]) {
        existingPermissionsNamespace[requestedNamespace][keyName] = {}
      }
      if (keyProps.read) {
        existingPermissionsNamespace[requestedNamespace][keyName]['read'] = true
      }
      if (keyProps.write) {
        existingPermissionsNamespace[requestedNamespace][keyName]['write'] = true
      }
    }

    return existingPermissionsNamespace
  }

  storeMetadata (requestingNamespace, requestedNamespace, key, value) {
    requestedNamespace = this.cleanNamespace(requestedNamespace)
    if (!this.hasWritePermission(requestingNamespace, requestedNamespace, key)) {
      throw new MissingPermissionError('Missing Write Permission')
    }
    let currentStorageRaw = this.storage.getItem(this.keyword)
    let currentStorage = {}
    if (currentStorageRaw) {
      currentStorage = JSON.parse(currentStorageRaw)
    }
    console.log('currentStorage', currentStorage)
    if (!currentStorage[requestedNamespace]) {
      currentStorage[requestedNamespace] = {}
    }
    currentStorage[requestedNamespace][key] = value
    this.storage.setItem(this.keyword, JSON.stringify(currentStorage))
    return true
  }

  readMetadata (requestingNamespace, requestedNamespace, key) {
    requestedNamespace = this.cleanNamespace(requestedNamespace)

    if (!this.hasReadPermission(requestingNamespace, requestedNamespace, key)) {
      let error = new MissingPermissionError('Missing Read Permission')
      throw error
    }

    let currentStorageRaw = this.storage.getItem(this.keyword)
    if (!currentStorageRaw) {
      return null
    }
    let currentStorage = JSON.parse(currentStorageRaw)
    if (currentStorage[requestedNamespace] && currentStorage[requestedNamespace][key]) {
      return currentStorage[requestedNamespace][key]
    }
    return null
  }

  hasReadPermission (requestingNamespace, requestedNamespace, key) {
    return this.hasPermission(requestingNamespace, requestedNamespace, key, 'read')
  }

  hasWritePermission (requestingNamespace, requestedNamespace, key) {
    return this.hasPermission(requestingNamespace, requestedNamespace, key, 'write')
  }

  hasPermission (requestingNamespace, requestedNamespace, key, type) {
    requestingNamespace = this.cleanNamespace(requestingNamespace)
    requestedNamespace = this.cleanNamespace(requestedNamespace)
    console.log('hasPermission', requestingNamespace, requestedNamespace, key, type)
    if (requestingNamespace === requestedNamespace) {
      console.log('its the same app')
      return true
    }
    let permissionsRaw = this.storage.getItem(this.permissionKeyword)
    if (!permissionsRaw) {
      return false
    }
    let permissions = JSON.parse(permissionsRaw)
    console.log('permissions', permissions)
    if (
      permissions &&
      permissions[requestingNamespace] &&
      permissions[requestingNamespace][requestedNamespace] &&
      permissions[requestingNamespace][requestedNamespace][key] &&
      permissions[requestingNamespace][requestedNamespace][key][type]
    ) {
      return true
    }
    return false
  }

  cleanNamespace (namespace) {
    try {
      if (!namespace.startsWith('http')) {
        // nice hack bro
        namespace = 'http://' + namespace
      }
      const url = Url.parse(namespace)
      if (url.host) {
        return url.host
      } else {
        throw new Error('malformed namespace')
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  normalizePermissionJson (requestedPermissions) {
    let normalizedPermissions = {}
    try {
      for (let [requestedNamespace, requestedKeys] of Object.entries(requestedPermissions)) {
        try {
          requestedNamespace = this.cleanNamespace(requestedNamespace)
          normalizedPermissions[requestedNamespace] = {}

          if (Array.isArray(requestedKeys)) {
            let keysObj = {}
            for (let key of requestedKeys) {
              keysObj[key] = {
                read: true
              }
            }
            requestedKeys = keysObj
          }

          for (let [keyName, keyProps] of Object.entries(requestedKeys)) {
            if (!keyName || keyName === '') {
              continue
            }
            normalizedPermissions[requestedNamespace][keyName] = {
              read: false,
              write: false
            }
            if (keyProps['read']) {
              normalizedPermissions[requestedNamespace][keyName]['read'] = true
            }
            if (keyProps['write']) {
              normalizedPermissions[requestedNamespace][keyName]['write'] = true
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
    } catch (e) {
      console.log(e)
    }
    return normalizedPermissions
  }
}

export default MetadataStorage
