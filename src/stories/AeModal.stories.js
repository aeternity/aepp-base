/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import Vuex from 'vuex';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import '@aeternity/aepp-components-3/dist/aepp.components.css';
import '@aeternity/aepp-components-3/dist/aepp.fonts.css';
import AeButton from '../components/AeButton.vue';
import MigratedBalanceModal from '../components/MigratedBalanceModal.vue';
import LedgerModal from '../components/desktop/LedgerModal.vue';
import LedgerAddressConfirmModal from '../components/desktop/LedgerAddressConfirmModal.vue';
import SignTransactionConfirmModal from '../components/desktop/SignTransactionConfirmModal.vue';
import { account } from './mock-data';

Vue.use(Vuex);

storiesOf('AeModal', module)
  .add('MigratedBalanceModal', () => ({
    components: { MigratedBalanceModal },
    template: '<migrated-balance-modal @close="action" />',
    methods: { action: action('close') },
    store: new Vuex.Store({
      getters: {
        activeIdentity: () => account,
      },
    }),
  }))
  .add('LedgerModal', () => ({
    components: { LedgerModal, AeButton },
    template: `
      <ledger-modal
        closable
        title="Ledger Modal"
        @close="action"
      >
        Content
        
        <ae-button
          slot="footer"
          size="small"
          plain
        >
          Back
        </ae-button>
      </ledger-modal>
    `,
    methods: { action: action('closed') },
  }))
  .add('LedgerAddressConfirmModal', () => ({
    components: { LedgerAddressConfirmModal },
    template: '<ledger-address-confirm-modal />',
    store: new Vuex.Store({
      state: {
        desktop: {
          showConfirmModalForAddress: account.address,
        },
      },
    }),
  }))
  .add('SignTransactionConfirmModal', () => ({
    components: { SignTransactionConfirmModal },
    template: '<sign-transaction-confirm-modal />',
    store: new Vuex.Store({
      state: {
        desktop: {
          showSignTransactionModalForAddress: account.address,
        },
      },
    }),
  }))
  }));
