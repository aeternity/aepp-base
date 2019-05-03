/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import AeInputMnemonic from '../components/AeInputMnemonic.vue';

storiesOf('AeInputMnemonic', module)
  .add('default', () => ({
    components: { AeInputMnemonic },
    template: `
      <div>
        <ae-input-mnemonic v-model="value" />
        Value: {{ value }}
      </div>`,
    data: () => ({ value: '' }),
  }));
