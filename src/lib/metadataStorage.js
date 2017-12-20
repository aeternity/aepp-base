const Url = require('url')

class MetadataStorage {
  // TODO: main / open namespace
  // TODO: read / write permissions
  // TODO: @schema type?
  // TODO: display requested permissions (raw)
  // TODO: function to check missing permissions
  // TODO: aepp can always access own namespace?
  // TODO: own cool errors
  // TODO: version string

  constructor () {
    this.storage = localStorage
    this.keyword = 'metadata'
    this.permissionKeyword = 'metadataPermissions'
    this.identityNamespace = 'identity.aepps.com'
  }

  grantPermissions (requestingNamespace, requestedPermissions) {
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

  storeMetadata (namespace, key, value) {
    try {
      namespace = this.cleanNamespace(namespace)
      let currentStorageRaw = this.storage.getItem(this.keyword)
      let currentStorage = {}
      if (currentStorageRaw) {
        currentStorage = JSON.parse(currentStorageRaw)
      }
      console.log('currentStorage', currentStorage)
      if (!currentStorage[namespace]) {
        currentStorage[namespace] = {}
      }
      currentStorage[namespace][key] = value
      this.storage.setItem(this.keyword, JSON.stringify(currentStorage))
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  readMetadata (namespace, key) {
    try {
      namespace = this.cleanNamespace(namespace)
      let currentStorageRaw = this.storage.getItem(this.keyword)
      if (!currentStorageRaw) {
        return null
      }
      let currentStorage = JSON.parse(currentStorageRaw)
      if (currentStorage[namespace] && currentStorage[namespace][key]) {
        return currentStorage[namespace][key]
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }

  cleanNamespace (namespace) {
    try {
      const url = Url.parse(namespace)
      // console.log(namespace, url)
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
