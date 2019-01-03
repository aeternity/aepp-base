/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import AeInput from '../components/AeInput.vue';

storiesOf('AeInput', module)
  .add('default', () => ({
    components: { AeInput },
    template: `
      <div>
        <ae-input
          header="Header"
          header-right="Header right"
          footer="Footer"
          footer-right="Footer right"
          v-model="value"
        />
        Value: {{ value }}
      </div>`,
    data: () => ({ value: '' }),
  }))
  .add('Network connect', () => ({
    components: { AeInput },
    template: `
      <div>
        <ae-input
          header="Node Name"
          value="My Node"
        />
        <ae-input
          header="Node URL"
          value="//testnet.mynode.com"
        />
      </div>
    `,
  }), {
    notes: {
      markdown: `
[Network connect](https://app.zeplin.io/project/59e4cf99fc0bb2f99a89551b/screen/5c0fe369a15cd3246e949d6d)
`,
    },
  });
