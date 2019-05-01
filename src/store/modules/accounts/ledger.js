/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import TransportU2F from '@ledgerhq/hw-transport-u2f';
import Ae from '@aeternity/ledger-app-api';
import { Crypto, TxBuilder } from '@aeternity/aepp-sdk/es';
import { OBJECT_ID_TX_TYPE } from '@aeternity/aepp-sdk/es/tx/builder/schema';
import { MAGNITUDE } from '../../../lib/constants';

const signOnMobile = async ({ dispatch }) => {
  await dispatch('modals/open', {
    name: 'alert',
    text: `
      Signing on mobile using Ledger is not supported now.
      Please use desktop version of Base æpp to sign this transaction.
    `,
  }, { root: true });
  throw new Error('Not implemented yet');
};

export default {
  namespaced: true,

  account: {
    type: 'ledger',
    color: 'dark',
  },

  getters: process.env.IS_MOBILE_DEVICE ? {} : {
    nextIdx: (state, getters, rootState, rootGetters) => Math.max(
      ...rootGetters['accounts/getByType']('ledger').map(({ source: { idx } }) => idx),
      -1,
    ) + 1,
    ledgerAppApi: () => new Ae(new TransportU2F()),
  },

  actions: process.env.IS_MOBILE_DEVICE ? {
    sign: signOnMobile,
    signTransaction: signOnMobile,
  } : {
    async create({ getters: { nextIdx, ledgerAppApi }, commit, dispatch }) {
      const conformModalPromise = dispatch('modals/open', {
        name: 'confirmLedgerAddress',
        address: await ledgerAppApi.getAddress(nextIdx),
        create: true,
      }, { root: true });
      let address;
      do {
        // eslint-disable-next-line no-await-in-loop
        address = await ledgerAppApi.getAddress(nextIdx, true).catch(() => {});
      } while (!address && !nextIdx);
      conformModalPromise.cancel();
      if (!address) return;
      commit('accounts/add', { address, type: 'ledger', idx: nextIdx }, { root: true });
    },

    sign: () => Promise.reject(new Error('Not implemented yet')),

    async signTransaction({
      getters: { ledgerAppApi }, rootGetters, dispatch, rootState: { sdk },
    }, txBase64) {
      const txObject = TxBuilder.unpackTx(txBase64).tx;
      const stringTx = TxBuilder.buildTx(
        {
          ...txObject,
          ...!process.env.RUNNING_IN_FRAME && {
            fee: (await dispatch('modals/open', { name: 'getLedgerTransactionFee' }, { root: true }))
              .shiftedBy(MAGNITUDE),
          },
        },
        OBJECT_ID_TX_TYPE[txObject.tag],
      ).tx;

      let conformModalPromise;
      try {
        conformModalPromise = dispatch('modals/open', { name: 'confirmLedgerSignTransaction' }, { root: true });
        const binaryTx = Crypto.decodeBase64Check(Crypto.assertedType(stringTx, 'tx'));
        const signature = Buffer.from(await ledgerAppApi.signTransaction(
          rootGetters['accounts/active'].source.idx,
          binaryTx,
          sdk.nodeNetworkId,
        ), 'hex');
        return Crypto.encodeTx(Crypto.prepareTx(signature, binaryTx));
      } finally {
        conformModalPromise.cancel();
      }
    },
  },
};
