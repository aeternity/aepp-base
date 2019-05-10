/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import AeIdenticon from '../components/AeIdenticon.vue';

storiesOf('AeIdenticon', module)
  .add('default', () => ({
    components: { AeIdenticon },
    template: `
      <div>
        <AeIdenticon :address="address" />
        Address: {{ address }}<br>
        <input
          type="text"
          v-model="address"
        />
      </div>`,
    data: () => ({ address: 'ak_' }),
  }));
