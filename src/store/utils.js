export const genRandomBuffer = (size) => {
  const key = new ArrayBuffer(size);
  window.crypto.getRandomValues(new Uint8Array(key));
  return key;
};

export const derivePasswordKey = async (password, salt) => {
  const passwordKey = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2', salt, iterations: 15000, hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-CTR', length: 128 },
    false,
    ['encrypt', 'decrypt'],
  );
};
