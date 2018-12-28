/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import AeAddress from '../components/AeAddress.vue';
import { address } from './mock-data';

const base = {
  components: { AeAddress },
  data: () => ({ address }),
};

storiesOf('AeAddress', module)
  .add('full', () => ({
    ...base,
    template: '<ae-address :address="address" />',
  }))
  .add('grouped', () => ({
    ...base,
    template: '<ae-address :address="address" split-by="3" />',
  }))
  .add('medium', () => ({
    ...base,
    template: '<ae-address :address="address" length="medium" />',
  }))
  .add('short', () => ({
    ...base,
    template: '<ae-address :address="address" length="short" />',
  }));
