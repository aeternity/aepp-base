// eslint-disable-next-line import/prefer-default-export
export const genRandomBuffer = (size) => {
  const key = new ArrayBuffer(size);
  window.crypto.getRandomValues(new Uint8Array(key));
  return key;
};
