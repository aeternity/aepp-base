class MetadataStorage {
  constructor () {
    this.storage = localStorage
    this.keyword = 'metadata'
  }

  storeMetadata (namespace, key, value) {
    try {
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
}

export default MetadataStorage
