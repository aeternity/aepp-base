/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { Observable } from 'rxjs';
import Vuex from 'vuex';
import ConfirmTransactionSignModal from '../../components/mobile/ConfirmTransactionSignModal.vue';
import {
  account, accounts, accountsModule, contractAddress, callData, code, amount, fee, minFee,
} from '../mock-data';

const genStory = transaction => () => ({
  methods: {
    resolve: action('resolve'),
    reject: action('reject'),
  },
  store: new Vuex.Store({
    modules: { accounts: accountsModule },
    state: {
      mobile: {
        stepFraction: {
          numerator: 3,
          denominator: 3,
        },
      },
      addressBook: [],
      observables: {
        activeAccount: new Observable(s => s.next(account)),
      },
    },
  }),
  components: { ConfirmTransactionSignModal },
  data: () => ({ transaction }),
  template: `
    <confirm-transaction-sign-modal
      :resolve="resolve"
      :reject="reject"
      :transaction="transaction"
    />`,
});

storiesOf('mobile ConfirmTransactionSignModal', module)
  .add('spend', genStory({
    tag: 12,
    recipientId: accounts[0].address,
    amount,
    fee,
    minFee,
    payload: 'Example payload',
  }))
  .add('contractCreate', genStory({
    tag: 42, code, callData, amount, fee, minFee,
  }))
  .add('contractCall', genStory({
    tag: 43, contractId: contractAddress, callData, amount, fee, minFee,
  }));
