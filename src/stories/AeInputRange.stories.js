/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import AeInputRange from '../components/AeInputRange.vue';
import { primary } from './backgrounds';

storiesOf('AeInputRange', module)
  .add('default', () => ({
    components: { AeInputRange },
    template: '<ae-input-range @input="action" />',
    methods: { action: action('input') },
  }))
  .add('light', () => ({
    components: { AeInputRange },
    template: '<ae-input-range fill="light" />',
  }), {
    backgrounds: [primary],
  });
