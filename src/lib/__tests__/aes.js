import AES from '../aes';

if (window.crypto && window.crypto.subtle) {
  throw new Error('This tests should be rewritten using provided Web Crypto API');
}

const getTestArray = (length) => Buffer.alloc(length).map((_, idx) => idx);

const testKey = getTestArray(16);
const testData = getTestArray(24);
const testResult = getTestArray(24).reverse();

const mockCryptMethod = (methodName) => {
  const cryptMethod = jest.fn().mockImplementation(() => Promise.resolve(testResult));
  window.crypto = { subtle: { [methodName]: cryptMethod } };
};

const unMockCryptMethod = () => {
  delete window.crypto;
};

const genCryptTest = (methodName) => () => {
  mockCryptMethod(methodName);
  const aes = new AES(testKey);
  expect(aes[methodName](testData)).resolves.toBe(testResult);
  expect(window.crypto.subtle[methodName]).toHaveBeenCalledWith(
    { name: 'AES-CTR', counter: Buffer.alloc(16), length: 128 },
    testKey,
    testData,
  );
  unMockCryptMethod();
};

const genCryptCounterTest = (methodName) => async () => {
  mockCryptMethod(methodName);
  const aes = new AES(testKey);
  await aes[methodName](testData);
  aes[methodName](testData);
  const counter = Buffer.alloc(16);
  counter[15] = 2;
  expect(window.crypto.subtle[methodName]).toHaveBeenLastCalledWith(
    { name: 'AES-CTR', counter, length: 128 },
    testKey,
    testData,
  );
  unMockCryptMethod();
};

describe('encrypt', () => {
  it('encrypts', genCryptTest('encrypt'));

  it('increases counter value', genCryptCounterTest('encrypt'));
});

describe('decrypt', () => {
  it('decrypts', genCryptTest('decrypt'));

  it('increases counter value', genCryptCounterTest('decrypt'));
});
