/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { AeQrCode } from '../components/async';

storiesOf('AeQrCode', module)
  .add('default', () => ({
    components: { AeQrCode },
    template: `
      <div>
        <div :style="'border: 1px solid red; width: ' + width + 'px'">
          <AeQrCode :data="data" />
        </div>
        Data: {{ data }}<br>
        Wrapper width: {{ width }}<br>
        <input
          type="text"
          v-model="data"
        /><br>
        <input
          type="range"
          v-model="width"
          min="0"
          max="512"
        />
      </div>`,
    data: () => ({ data: 'test', width: 128 }),
  }));
