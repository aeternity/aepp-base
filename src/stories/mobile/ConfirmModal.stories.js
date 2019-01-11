/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Vuex from 'vuex';
import BigNumber from 'bignumber.js';
import ConfirmAccountAccessModal from '../../components/mobile/ConfirmAccountAccessModal.vue';
import ConfirmSpendModal from '../../components/mobile/ConfirmSpendModal.vue';
import { account, accounts } from '../mock-data';

storiesOf('mobile ConfirmModal', module)
  .add('ConfirmAccountAccessModal', () => ({
    components: { ConfirmAccountAccessModal },
    template: `
      <confirm-account-access-modal
        app-name="Test app"
        :resolve="resolve"
        :reject="reject"
      />`,
    methods: {
      resolve: action('resolve'),
      reject: action('reject'),
    },
  }))
  .add('ConfirmSpendModal', () => ({
    components: { ConfirmSpendModal },
    template: `
      <confirm-spend-modal
        :resolve="resolve"
        :reject="reject"
        :recipientId="recipientId"
        :amount="amount"
      />`,
    data: () => ({
      amount: BigNumber(100),
      recipientId: accounts[0].address,
    }),
    methods: {
      resolve: action('resolve'),
      reject: action('reject'),
    },
    store: new Vuex.Store({
      getters: {
        activeIdentity: () => account,
      },
    }),
  }));
