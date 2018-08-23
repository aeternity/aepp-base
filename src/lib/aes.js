export default class AES {
  constructor(key) {
    this.algorithm = {
      name: 'AES-CTR',
      counter: new Uint8Array(16),
      length: 128,
    };
    this.key = key;
  }

  encrypt(data) {
    return window.crypto.subtle.encrypt(this.algorithm, this.key, data);
  }

  decrypt(data) {
    return window.crypto.subtle.decrypt(this.algorithm, this.key, data);
  }
}
