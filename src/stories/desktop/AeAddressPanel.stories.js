/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import AeAddress from '../../components/desktop/AeAddressPanel.vue';
import { address } from '../mock-data';

const base = {
  components: { AeAddress },
  data: () => ({ address }),
};

storiesOf('AeAddressPanel', module)
  .add('default', () => ({
    ...base,
    template: '<ae-address :address="address" />',
  }))
  .add('LedgerAddressConfirmModal', () => ({
    ...base,
    template: '<ae-address title="Ledger Address" :address="address" />',
  }));
