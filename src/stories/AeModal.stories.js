/* eslint-disable import/no-extraneous-dependencies */
import Vuex from 'vuex';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import AeButton from '../components/AeButton.vue';
import MigratedBalanceModal from '../components/mobile/MigratedBalanceModal.vue';
import LedgerModal from '../components/desktop/LedgerModal.vue';
import LedgerAddressConfirmModal from '../components/desktop/LedgerAddressConfirmModal.vue';
import LedgerSignTransactionModal from '../components/desktop/LedgerSignTransactionModal.vue';
import LedgerTransactionFeeModal from '../components/desktop/LedgerTransactionFeeModal.vue';
import ModalSpendSuccess from '../components/desktop/ModalSpendSuccess.vue';
import { account, amount, transactionHash } from './mock-data';

storiesOf('AeModal', module)
  .add('MigratedBalanceModal', () => ({
    components: { MigratedBalanceModal },
    template: '<migrated-balance-modal :resolve="resolve" />',
    methods: { resolve: action('resolve') },
    store: new Vuex.Store({
      getters: {
        'accounts/active': () => account,
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
    template: '<ledger-address-confirm-modal :address="address" />',
    data: () => ({ address: account.address }),
  }))
  .add('LedgerSignTransactionModal', () => ({
    components: { LedgerSignTransactionModal },
    template: '<ledger-sign-transaction-modal />',
  }))
  .add('LedgerTransactionFeeModal', () => ({
    components: { LedgerTransactionFeeModal },
    template: `
      <ledger-transaction-fee-modal
        :resolve="resolve"
        :reject="reject"
      />`,
    data: () => ({
      resolve: action('resolve'),
      reject: action('reject'),
    }),
  }))
  .add('ModalSpendSuccess', () => ({
    components: { ModalSpendSuccess },
    template: `
      <ModalSpendSuccess
        :amount="amount"
        transaction-hash="transactionHash"
        :resolve="resolve"
      />`,
    data: () => ({
      amount,
      transactionHash,
      resolve: action('resolve'),
    }),
    store: new Vuex.Store({
      getters: {
        currentNetwork: () => ({
          explorerUrl: 'http://example.com',
        }),
      },
    }),
  }));
