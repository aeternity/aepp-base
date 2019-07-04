/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Vuex from 'vuex';
import ConfirmAccountAccess from '../components/ConfirmAccountAccess.vue';
import { account, getAppMetadata } from './mock-data';

const base = {
  methods: {
    resolve: action('resolve'),
    reject: action('reject'),
  },
  store: new Vuex.Store({
    state: {
      accounts: {
        list: [account],
      },
    },
    getters: {
      'accounts/active': () => account,
      getAppMetadata,
    },
  }),
};

storiesOf('ConfirmAccountAccess', module)
  .add('default', () => ({
    mixins: [base],
    components: { ConfirmAccountAccess },
    template: `
      <ConfirmAccountAccess
        app-host="test-host"
        :resolve="resolve"
        :reject="reject"
      />`,
  }));
