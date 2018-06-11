/**
 * Exporting a promisified version of the
 * SecureStorage API. No callback hell.
 * @param storage
 */
export default function (storage) {
  return {
    /**
     * Get Item
     * @param key
     * @return {Promise<any>}
     */
    getItem: function (key) {
      return new Promise(function (resolve, reject) {
        return storage.getItem(key, resolve, reject)
      })
    },

    /**
     * Set Item
     * @param key
     * @param value
     * @return {Promise<any>}
     */
    setItem: function (key, value) {
      return new Promise(function (resolve, reject) {
        return storage.setItem(key, value, resolve, reject)
      })
    },

    /**
     * Remove Item
     * @param key
     * @return {Promise<any>}
     */
    removeItem: function (key) {
      return new Promise(function (resolve, reject) {
        return storage.removeItem(key, resolve, reject)
      })
    },

    /**
     * Clear
     * @return {Promise<any>}
     */
    clear: function () {
      return new Promise(function (resolve, reject) {
        return storage.removeAll(resolve, reject)
      })
    }
  }
}
