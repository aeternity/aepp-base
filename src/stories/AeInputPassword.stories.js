/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import AeInputPassword from '../components/AeInputPassword.vue';

storiesOf('AeInputPassword', module)
  .add('default', () => ({
    components: { AeInputPassword },
    template: `
      <div>
        <ae-input-password
          header="Header"
          header-right="Header right"
          v-model="value"
        />
        Value: {{ value }}
      </div>`,
    data: () => ({ value: '' }),
  }))
  .add('Login', () => ({
    components: { AeInputPassword },
    template: `
      <ae-input-password value="Example password">
        <a
          slot="footer"
          href="example.com"
        >
          Recover account
        </a>
      </ae-input-password>`,
  }), {
    notes: {
      markdown: `
[mobile Login](https://app.zeplin.io/project/59e4cf99fc0bb2f99a89551b/screen/5c1109ac6309de2479fc7235)
`,
    },
  })
  .add('New Account', () => ({
    components: { AeInputPassword },
    template: `
      <div>
        <ae-input-password
          hide-reveal-button
          value="Example password"
        />
        <ae-input-password
          error
          hide-reveal-button
          header="Confirm your password"
          value="Example"
          footer="Passwords don't match, try again"
        />
      </div>`,
  }), {
    notes: {
      markdown: `
[mobile New Account](https://app.zeplin.io/project/59e4cf99fc0bb2f99a89551b/screen/5c1109ad049de8af829794b3)
`,
    },
  });
