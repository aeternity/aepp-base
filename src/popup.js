import Vue from 'vue';
import Vuex from 'vuex';
import BigNumber from 'bignumber.js';
import './ui-common';
import store from './store';
import languages, { i18n } from './store/plugins/ui/languages';
import initSdk from './store/plugins/initSdk';
import names from './store/plugins/ui/names';
import appsMetadata from './store/plugins/ui/appsMetadata';
import observables from './store/plugins/ui/observables';
import currencies from './store/plugins/ui/currencies';
import ConfirmAccountAccess from './components/ConfirmAccountAccess.vue';
import ConfirmTransactionSignModal from './components/mobile/ConfirmTransactionSignModal.vue';
import ConfirmSignModal from './components/mobile/ConfirmSignModal.vue';

Vue.use(Vuex);

[languages, initSdk, names, appsMetadata, observables, currencies].forEach(plugin => plugin(store));

const unloadHandler = () => {
  window.modalProps.reject(new Error('Rejected by user'));
};

window.addEventListener('beforeunload', unloadHandler);

const closingWrapper = f => (...args) => {
  f(...args);
  window.removeEventListener('beforeunload', unloadHandler);
  window.close();
};

new Vue({
  store,
  i18n,
  render: h => h(
    {
      confirmAccountAccess: ConfirmAccountAccess,
      confirmTransactionSign: ConfirmTransactionSignModal,
      confirmSign: ConfirmSignModal,
    }[window.modalName], {
      props: {
        ...window.modalProps,
        transaction: window.modalProps.transaction && {
          ...window.modalProps.transaction,
          amount: BigNumber(window.modalProps.transaction.amount),
          fee: BigNumber(window.modalProps.transaction.fee),
          minFee: BigNumber(window.modalProps.transaction.minFee),
        },
        resolve: closingWrapper(window.modalProps.resolve),
        reject: closingWrapper(window.modalProps.reject),
      },
    },
  ),
})
  .$mount('#app');
