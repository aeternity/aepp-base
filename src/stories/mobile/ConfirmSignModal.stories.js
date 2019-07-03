/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Vuex from 'vuex';
import ConfirmSignModal from '../../components/mobile/ConfirmSignModal.vue';
import { accountsModule } from '../mock-data';


storiesOf('mobile ConfirmSignModal', module)
  .add('default', () => ({
    methods: {
      resolve: action('resolve'),
      reject: action('reject'),
    },
    store: new Vuex.Store({
      modules: { accounts: accountsModule },
      state: { addressBook: [] },
    }),
    components: { ConfirmSignModal },
    template: `
      <confirm-sign-modal
        :resolve="resolve"
        :reject="reject"
        data="example data"
      />`,
  }));
