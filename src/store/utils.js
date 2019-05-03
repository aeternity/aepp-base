import {
  isPlainObject, mapKeys, mapValues, cloneDeep,
} from 'lodash-es';
import { derivePathFromKey, getKeyPair } from '@aeternity/hd-wallet/src/hd-key';
import { Crypto } from '@aeternity/aepp-sdk/es';

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

export const fetchJson = async (...args) => {
  const response = await fetch(...args);
  return response.json();
};

export const mapKeysDeep = (object, callback) => {
  if (Array.isArray(object)) return object.map(item => mapKeysDeep(item, callback));
  if (!isPlainObject(object)) return object;
  return mapValues(mapKeys(object, callback), item => mapKeysDeep(item, callback));
};

export const makeResetable = ({
  modules, state = {}, mutations = {}, actions = {}, ...otherModule
}) => {
  const getInitialState = typeof state === 'function'
    ? state
    : (() => {
      const initialState = cloneDeep(state);
      return () => cloneDeep(initialState);
    })();
  return ({
    ...otherModule,
    ...modules && {
      modules: Object.entries(modules)
        .reduce((acc, [name, module]) => ({ ...acc, [name]: makeResetable(module) }), {}),
    },
    state,
    mutations: {
      ...mutations,
      reset(currentState) {
        Object.assign(currentState, getInitialState());
      },
    },
    actions: {
      ...actions,
      reset: {
        root: true,
        handler({ commit }) {
          commit('reset');
        },
      },
    },
  });
};

export { generateHDWallet as generateHdWallet } from '@aeternity/hd-wallet/src';

export const getHdWalletAccount = (wallet, accountIdx) => {
  const keyPair = getKeyPair(derivePathFromKey(`${accountIdx}h/0h/0h`, wallet).privateKey);
  return {
    ...keyPair,
    idx: accountIdx,
    address: Crypto.aeEncodeKey(keyPair.publicKey),
  };
};
