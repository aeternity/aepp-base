/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Vuex from 'vuex';
import ConfirmAccountAccessModal from '../../components/mobile/ConfirmAccountAccessModal.vue';
import ConfirmContractCallModal from '../../components/mobile/ConfirmContractCallModal.vue';
import ConfirmContractDeployModal from '../../components/mobile/ConfirmContractDeployModal.vue';
import ConfirmSignModal from '../../components/mobile/ConfirmSignModal.vue';
import ConfirmSpendModal from '../../components/mobile/ConfirmSpendModal.vue';
import {
  account, accounts, contractAddress, callData, code, amount, fee, minFee,
} from '../mock-data';

const base = {
  methods: {
    resolve: action('resolve'),
    reject: action('reject'),
  },
  store: new Vuex.Store({
    state: { mobile: { stepIcon: '³⁄₃' } },
    getters: {
      activeIdentity: () => account,
    },
  }),
};

const amountAndFee = {
  data: () => ({ amount, fee, minFee }),
};

storiesOf('mobile ConfirmModal', module)
  .add('ConfirmAccountAccessModal', () => ({
    mixins: [base],
    components: { ConfirmAccountAccessModal },
    template: `
      <confirm-account-access-modal
        app-name="Test app"
        :resolve="resolve"
        :reject="reject"
      />`,
  }))
  .add('ConfirmContractCallModal', () => ({
    mixins: [base, amountAndFee],
    components: { ConfirmContractCallModal },
    template: `
      <confirm-contract-call-modal
        :resolve="resolve"
        :reject="reject"
        contract-id="${contractAddress}"
        call-data="${callData}"
        :amount="amount"
        :fee="fee"
        :minFee="minFee"
      />`,
  }))
  .add('ConfirmContractDeployModal', () => ({
    mixins: [base, amountAndFee],
    components: { ConfirmContractDeployModal },
    template: `
      <confirm-contract-deploy-modal
        :resolve="resolve"
        :reject="reject"
        code="${code}"
        call-data="${callData}"
        :amount="amount"
        :fee="fee"
        :minFee="minFee"
      />`,
  }))
  .add('ConfirmSignModal', () => ({
    mixins: [base],
    components: { ConfirmSignModal },
    template: `
      <confirm-sign-modal
        :resolve="resolve"
        :reject="reject"
        data="example data"
      />`,
  }))
  .add('ConfirmSpendModal', () => ({
    mixins: [base, amountAndFee],
    components: { ConfirmSpendModal },
    template: `
      <confirm-spend-modal
        :resolve="resolve"
        :reject="reject"
        :recipientId="recipientId"
        :amount="amount"
        :fee="fee"
        :minFee="minFee"
      />`,
    data: () => ({
      recipientId: accounts[0].address,
    }),
  }));
