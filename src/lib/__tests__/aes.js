import AES from '../aes'

if (window.crypto && window.crypto.subtle) {
  throw new Error('This tests should be rewritten using provided Web Crypto API')
}

const genCryptTest = methodName => () => {
  const getTestArray = length =>
    new Uint8Array(new Array(length).fill().map((_, idx) => idx))
  const testKey = getTestArray(16)
  const testData = getTestArray(24)
  const testResult = getTestArray(24).reverse
  const cryptMethod = jest.fn().mockImplementation(() =>
    new Promise(resolve => resolve(testResult)))
  window.crypto = { subtle: { [methodName]: cryptMethod } }

  const aes = new AES(testKey)
  expect(aes[methodName](testData)).resolves.toBe(testResult)
  expect(cryptMethod).toHaveBeenCalledWith(
    { name: 'AES-CTR', counter: new Uint8Array(16), length: 128 },
    testKey,
    testData
  )
}

it('encrypts', genCryptTest('encrypt'))
it('decrypts', genCryptTest('decrypt'))
