/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import AeInputAmount from '../components/AeInputAmount.vue';
import AeInputAmountAe from '../components/AeInputAmountAe.vue';

storiesOf('AeInputAmount', module)
  .add('default', () => ({
    components: { AeInputAmount },
    template: `
      <div>
        <ae-input-amount
          header="Header"
          header-right="Header right"
          footer="Footer"
          footer-right="Footer right"
          v-model="value"
        >
          <template slot="footer-right">
            using slot
          </template>
        </ae-input-amount>
        Value: {{ value }}
      </div>`,
    data: () => ({ value: '' }),
  }))
  .add('desktop transaction fee', () => ({
    components: { AeInputAmount },
    template: `
      <ae-input-amount
        header="Transaction Fee"
        header-right="Pico AE"
        value="17.5"
      />`,
  }), {
    notes: {
      markdown: `
[desktop transaction fee](https://app.zeplin.io/project/59e4cf99fc0bb2f99a89551b/screen/5c1cb6229e8c521148c04f0b)
`,
    },
  })
  .add('AeInputAmountAe', () => ({
    components: { AeInputAmountAe },
    template: '<ae-input-amount-ae />',
  }), {
    notes: {
      markdown: `
[send mobile](https://app.zeplin.io/project/59e4cf99fc0bb2f99a89551b/screen/5bf5481e0fae8e7eadad4135) 
[send desktop empty](https://app.zeplin.io/project/59e4cf99fc0bb2f99a89551b/screen/5c1a4cea9630f416ee43907d) 
[send desktop](https://app.zeplin.io/project/59e4cf99fc0bb2f99a89551b/screen/5c1a4cea9630f416ee4390ea)
`,
    },
  });
