export const genRandomBuffer = (size) => {
  const key = new ArrayBuffer(size)
  window.crypto.getRandomValues(new Uint8Array(key))
  return key
}

export const getPeerIdByKey = key =>
  Buffer.from(key).slice(0, 15).toString('base64')
