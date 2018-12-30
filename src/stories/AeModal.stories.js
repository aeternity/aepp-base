/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate, { Validator } from 'vee-validate';
import BigNumber from 'bignumber.js';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import '@aeternity/aepp-components-3/dist/aepp.components.css';
import '@aeternity/aepp-components-3/dist/aepp.fonts.css';
import AeButton from '../components/AeButton.vue';
import MigratedBalanceModal from '../components/MigratedBalanceModal.vue';
import LedgerModal from '../components/desktop/LedgerModal.vue';
import LedgerAddressConfirmModal from '../components/desktop/LedgerAddressConfirmModal.vue';
import SignTransactionConfirmModal from '../components/desktop/SignTransactionConfirmModal.vue';
import TransactionFeeModal from '../components/desktop/TransactionFeeModal.vue';
import { account } from './mock-data';

Vue.use(Vuex);
Validator.extend('min_value_exclusive', (value, [min]) => BigNumber(value).isGreaterThan(min));
Validator.extend('min_value', (value, [max]) => BigNumber(value).isGreaterThanOrEqualTo(max));
Validator.extend('max_value', (value, [max]) => BigNumber(value).isLessThanOrEqualTo(max));

Vue.use(VeeValidate, {
  dictionary: {
    en: {
      messages: {
        required: 'This field is required',
        min: (field, [length]) => `This field must be at least ${length} characters`,
        min_value: (field, [min]) => `This field must be ${min} or more`,
        min_value_exclusive: (field, [min]) => `This field must be more than ${min}`,
        max_value: (field, [max]) => `This field must be ${max} or less`,
      },
    },
  },
});

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
  .add('TransactionFeeModal', () => ({
    components: { TransactionFeeModal },
    template: '<transaction-fee-modal />',
    store: new Vuex.Store({
      state: {
        desktop: {
          showSignTransactionModalForAddress: account.address,
        },
      },
    }),
  }));
