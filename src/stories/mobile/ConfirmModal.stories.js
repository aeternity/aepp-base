/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Vuex from 'vuex';
import BigNumber from 'bignumber.js';
import ConfirmAccountAccessModal from '../../components/mobile/ConfirmAccountAccessModal.vue';
import ConfirmContractCallModal from '../../components/mobile/ConfirmContractCallModal.vue';
import ConfirmContractDeployModal from '../../components/mobile/ConfirmContractDeployModal.vue';
import ConfirmSignModal from '../../components/mobile/ConfirmSignModal.vue';
import ConfirmSpendTxModal from '../../components/mobile/ConfirmSpendTxModal.vue';
import { account, accounts, contractAddress } from '../mock-data';

const base = {
  methods: {
    resolve: action('resolve'),
    reject: action('reject'),
  },
  store: new Vuex.Store({
    getters: {
      activeIdentity: () => account,
    },
  }),
};

storiesOf('mobile ConfirmModal', module)
  .add('ConfirmAccountAccessModal', () => ({
    ...base,
    components: { ConfirmAccountAccessModal },
    template: `
      <confirm-account-access-modal
        app-name="Test app"
        :resolve="resolve"
        :reject="reject"
      />`,
  }))
  .add('ConfirmContractCallModal', () => ({
    ...base,
    components: { ConfirmContractCallModal },
    template: `
      <confirm-contract-call-modal
        :resolve="resolve"
        :reject="reject"
        contract-address="${contractAddress}"
        method-name="main"
        method-arguments="(5)"
      />`,
  }))
  .add('ConfirmContractDeployModal', () => ({
    ...base,
    components: { ConfirmContractDeployModal },
    template: `
      <confirm-contract-deploy-modal
        :resolve="resolve"
        :reject="reject"
        contract-byte-code="example contract byte code"
      />`,
  }))
  .add('ConfirmSignModal', () => ({
    ...base,
    components: { ConfirmSignModal },
    template: `
      <confirm-sign-modal
        :resolve="resolve"
        :reject="reject"
        data="example data"
      />`,
  }))
  .add('ConfirmSpendTxModal', () => ({
    ...base,
    components: { ConfirmSpendTxModal },
    template: `
      <confirm-spend-tx-modal
        :resolve="resolve"
        :reject="reject"
        :recipientId="recipientId"
        :amount="amount"
      />`,
    data: () => ({
      amount: BigNumber(100),
      recipientId: accounts[0].address,
    }),
  }));
