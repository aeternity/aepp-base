/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import AeQrCode from '../components/AeQrCode.vue';

storiesOf('AeQrCode', module)
  .add('default', () => ({
    components: { AeQrCode },
    template: `
      <div>
        <AeQrCode
          :data="data"
          :size="size"
        />
        Data: {{ data }}<br>
        Size: {{ size }}<br>
        <input
          type="text"
          v-model="data"
        /><br>
        <input
          type="range"
          v-model="size"
          min="0"
          max="512"
        />
      </div>`,
    data: () => ({ data: 'test', size: 128 }),
  }));
