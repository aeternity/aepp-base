import CryptoJS from 'crypto-js'

export default {
  encryptString (string, password) {
    return CryptoJS.AES.encrypt(string, password).toString()
  },
  decryptString (encryptedString, password) {
    return CryptoJS.AES.decrypt(encryptedString, password).toString(CryptoJS.enc.Utf8)
  }
}
