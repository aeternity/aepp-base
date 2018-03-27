import CryptoJS from 'crypto-js'

export default {
  encryptString (string, password) {
    return CryptoJS.AES.encrypt(string, password).toString()
  },
  decryptString (encryptedString, password) {
    try {
      return CryptoJS.AES.decrypt(encryptedString, password).toString(CryptoJS.enc.Utf8)
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
