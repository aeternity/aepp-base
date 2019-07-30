/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Notification from '../components/Notification.vue';
import NotificationSpend from '../components/NotificationSpend.vue';
import { amount } from './mock-data';

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
  .add('NotificationSpend', () => ({
    components: { NotificationSpend },
    template: `
      <NotificationSpend
        :amount="amount"
        transaction-hash="th_9HqNoJafu4sbTgxZBQf91Xm4xD5Rw6FNSxxrqPTr98TCZW71o"
        :resolve="resolve"
      />`,
    data: () => ({ amount }),
    methods,
  }));
