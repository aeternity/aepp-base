/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import '../components/icon.scss';
import Notification from '../components/Notification.vue';
import NotificationSpendSuccess from '../components/NotificationSpendSuccess.vue';
import { amount, transactionHash } from './mock-data';

const methods = { resolve: action('resolve') };

storiesOf('notifications', module)
  .add('Notification', () => ({
    components: { Notification },
    template: `
      <Notification
        text="Notification content"
        :resolve="resolve"
      />`,
    methods,
  }))
  .add('long text', () => ({
    components: { Notification },
    template: `
      <Notification
        text="Test Test Test Test aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Test Test Test"
        :resolve="resolve"
      />`,
    methods,
  }))
  .add('NotificationSpendSuccess', () => ({
    components: { NotificationSpendSuccess },
    template: `
      <NotificationSpendSuccess
        :amount="amount"
        transaction-hash="transactionHash"
        :resolve="resolve"
      />`,
    data: () => ({ amount, transactionHash }),
    methods,
  }));
