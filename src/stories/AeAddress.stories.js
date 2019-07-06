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
  .add('three-columns', () => ({
    ...base,
    template: '<ae-address :address="address" mode="three-columns" />',
  }))
  .add('three-columns-short', () => ({
    ...base,
    template: '<ae-address :address="address" mode="three-columns-short" />',
  }))
  .add('without copy on click', () => ({
    ...base,
    template: '<ae-address :address="address" disable-copy-on-click />',
  }));
