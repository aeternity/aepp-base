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
    payload: 'ba_RXhhbXBsZSBwYXlsb2FkcuABtw==',
  }))
  .add('contractCreate', genStory({
    tag: 42, code, callData, amount, fee, minFee,
  }))
  .add('contractCall', genStory({
    tag: 43, contractId: contractAddress, callData, amount, fee, minFee,
  }))
  .add('namePreClaim', genStory({
    tag: 33,
    commitmentId: 'cm_GF7MX1V5ZxZXgAp9E2V9jS4W2gE3D8Q66qwZsg5kGKvqKMSWB',
    fee,
    minFee,
  }))
  .add('nameClaim', genStory({
    tag: 32,
    name: 'nm_xJg74ni9AnNyKxBQN7ZZnXA',
    nameSalt: '5768289676548235',
    fee,
    minFee,
  }))
  .add('nameUpdate', genStory({
    tag: 34,
    clientTtl: '1',
    nameId: 'nm_Pt4qXUK6eSV5wdUGWYqDFcbfb1u1NHP1Fhmf5GmeYzMd4wAme',
    nameTtl: '50000',
    pointers: [{
      id: 'ak_2swhLkgBPeeADxVTAVCJnZLY5NZtCFiM93JxsEaMuC59euuFRQ',
      key: 'account_pubkey',
    }, {
      id: 'example data',
      key: 'some_data',
    }],
    fee,
    minFee,
  }));
