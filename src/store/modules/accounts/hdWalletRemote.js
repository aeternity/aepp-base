/* eslint no-param-reassign: ['error', { 'ignorePropertyModificationsFor': ['state'] }] */

import { getDesktopRemoteSignAction } from './utils';
import { i18n } from '../../plugins/ui/languages';

const type = `hd-wallet${ENV_MOBILE_DEVICE ? '-desktop' : ''}`;

const signOnMobile = async ({ dispatch }) => {
  await dispatch(
    'modals/open',
    {
      name: 'alert',
      text: i18n.t('remote-connection.modal.mobile-not-supported'),
    },
    { root: true },
  );
  throw new Error('Not implemented yet');
};

export default {
  namespaced: true,

  account: {
    type,
    getTypeVerbose: () => i18n.t('hd-wallet.account-name'),
    color: 'primary',
  },

  actions: {
    async isAccountUsed({ rootGetters: { node } }, address) {
      return node.getAccountByPubkey(address).then(
        () => true,
        () => false,
      );
    },

    async checkPreviousAndCreate({ dispatch, rootGetters }) {
      const { address } = rootGetters['accounts/getByType'](type).pop();
      if (!(await dispatch('isAccountUsed', address))) {
        await dispatch(
          'modals/open',
          {
            name: 'confirm',
            text: i18n.t('hd-wallet.new-account-warning'),
            primaryButtonText: i18n.t('im-sure'),
          },
          { root: true },
        );
      }
      return dispatch('create');
    },

    create({ dispatch }) {
      return dispatch('remoteConnection/call', { name: 'createAccount' }, { root: true });
    },
    ...(ENV_MOBILE_DEVICE
      ? {
          sign: signOnMobile,
          signTransaction: signOnMobile,
        }
      : {
          sign: getDesktopRemoteSignAction('sign', 'data'),
          signTransaction: getDesktopRemoteSignAction('signTransaction', 'transaction'),
        }),
  },
};
