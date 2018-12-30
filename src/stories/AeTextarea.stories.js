/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import AeTextarea from '../components/AeTextarea.vue';

storiesOf('AeTextarea', module)
  .add('default', () => ({
    components: { AeTextarea },
    template: `
      <div>
        <ae-textarea
          header="Header"
          header-right="Header right"
          footer="Footer"
          footer-right="Footer right"
          placeholder="Placeholder"
          v-model="value"
        >
          <template slot="footer-right">
            using slot
          </template>
        </ae-textarea>
        Value: {{ value }}
      </div>`,
    data: () => ({ value: '' }),
  }))
  .add('monospace', () => ({
    components: { AeTextarea },
    template: `
      <ae-textarea
        header="Header"
        footer="Footer"
        placeholder="Placeholder"
        monospace
      />`,
  }));
