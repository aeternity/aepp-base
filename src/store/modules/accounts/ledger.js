/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import Ae from '@aeternity/ledger-app-api';
import { TxBuilder, SCHEMA } from '@aeternity/aepp-sdk';
import { i18n } from '../../plugins/ui/languages';

const signOnMobile = async ({ dispatch }) => {
  await dispatch('modals/open', {
    name: 'alert',
    text: i18n.t('ledger.mobile-not-supported'),
  }, { root: true });
  throw new Error('Not implemented yet');
};

export default {
  namespaced: true,

  account: {
    type: 'ledger',
    getTypeVerbose: () => i18n.t('ledger.account-name'),
    color: 'dark',
  },

  getters: process.env.IS_MOBILE_DEVICE ? {} : {
    nextIdx: (state, getters, rootState, rootGetters) => Math.max(
      ...rootGetters['accounts/getByType']('ledger').map(({ source: { idx } }) => idx),
      -1,
    ) + 1,
  },

  actions: process.env.IS_MOBILE_DEVICE ? {
    sign: signOnMobile,
    signTransaction: signOnMobile,
  } : {
    async request({ dispatch }, { name, args }) {
      const transport = await TransportWebUSB.create();
      const ledgerAppApi = new Ae(transport);
      if (process.env.RUNNING_IN_FRAME) return ledgerAppApi[name](...args);
      const modalName = { signTransaction: 'ledgerSignTransaction' }[name] || 'ledgerRequest';
      let result;
      let error;
      try {
        do {
          if (error) {
            // eslint-disable-next-line no-await-in-loop
            await dispatch('modals/open', { name: 'retryLedgerRequest' }, { root: true });
          }
          const modalPromise = dispatch('modals/open', { name: modalName }, { root: true });
          try {
            result = await ledgerAppApi[name](...args); // eslint-disable-line no-await-in-loop
            error = false;
          } catch (err) {
            error = true;
          } finally {
            modalPromise.cancel();
          }
        } while (error);
      } finally {
        await transport.close();
      }
      return result;
    },

    async create({ getters: { nextIdx }, commit, dispatch }) {
      const modalPromise = dispatch('modals/open', {
        name: 'confirmLedgerAddress',
        address: await dispatch('request', { name: 'getAddress', args: [nextIdx] }),
        create: true,
      }, { root: true });
      const transport = await TransportWebUSB.create();
      const ledgerAppApi = new Ae(transport);
      try {
        const address = await ledgerAppApi.getAddress(nextIdx, true);
        commit('accounts/add', { address, type: 'ledger', idx: nextIdx }, { root: true });
      } catch (error) {
        dispatch('modals/open', { name: 'ledgerAddressNotConfirmed' }, { root: true });
      } finally {
        await transport.close();
        modalPromise.cancel();
      }
    },

    async ensureCurrentAccountAvailable({ rootGetters, dispatch }) {
      const account = rootGetters['accounts/active'];
      const address = await dispatch('request', { name: 'getAddress', args: [account.source.idx] });
      if (account.address !== address) {
        if (!process.env.RUNNING_IN_FRAME) {
          dispatch('modals/open', { name: 'ledgerAccountNotFound' }, { root: true });
        }
        throw new Error('Account not found');
      }
    },

    sign: () => Promise.reject(new Error('Not implemented yet')),

    async signTransaction({ rootGetters, dispatch, rootState: { sdk } }, txBase64) {
      await dispatch('ensureCurrentAccountAvailable');

      const txObject = TxBuilder.unpackTx(txBase64).tx;
      const binaryTx = TxBuilder.buildTx(
        txObject,
        SCHEMA.OBJECT_ID_TX_TYPE[txObject.tag],
        { vsn: txObject.VSN },
      ).rlpEncoded;

      const signature = Buffer.from(await dispatch('request', {
        name: 'signTransaction',
        args: [
          rootGetters['accounts/active'].source.idx,
          binaryTx,
          sdk.getNetworkId(),
        ],
      }), 'hex');
      return TxBuilder
        .buildTx({ encodedTx: binaryTx, signatures: [signature] }, SCHEMA.TX_TYPE.signed).tx;
    },
  },
};
