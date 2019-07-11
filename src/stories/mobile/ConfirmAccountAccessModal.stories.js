/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Vuex from 'vuex';
import ConfirmAccountAccessModal from '../../components/mobile/ConfirmAccountAccessModal.vue';
import { accountsModules, getAppMetadata } from '../mock-data';

storiesOf('mobile ConfirmAccountAccessModal', module)
  .add('default', () => ({
    components: { ConfirmAccountAccessModal },
    methods: {
      resolve: action('resolve'),
      reject: action('reject'),
    },
    store: new Vuex.Store({
      modules: accountsModules,
      state: { mobile: {} },
      getters: {
        getAppMetadata,
      },
    }),
    template: `
      <confirm-account-access-modal
        app-host="test-host"
        :resolve="resolve"
        :reject="reject"
      />`,
  }));
