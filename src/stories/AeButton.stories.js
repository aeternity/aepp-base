/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import AeButton from '../components/AeButton.vue';

storiesOf('AeButton', module)
  .add('with text', () => ({
    components: { AeButton },
    template: '<ae-button @click="action">Hello Button</ae-button>',
    methods: { action: action('clicked') },
  }))
  .add('Onboarding', () => ({
    components: { AeButton },
    template: `
      <div>
        <ae-button plain size="small">skip</ae-button>
        <ae-button :plain="true" size="small">next</ae-button>
      </div>`,
  }))
  .add('Intro', () => ({
    components: { AeButton },
    template: `
      <div style="background: #ff0d6a; display: flex; flex-direction: column">
        <ae-button fill="secondary">
          Login
        </ae-button>
        <ae-button plain fill="light">
          Create New Account
        </ae-button>
        <ae-button plain fill="light">
          See how it works
        </ae-button>
      </div>`,
  }))
  .add('New Account', () => ({
    components: { AeButton },
    template: '<ae-button fill="secondary" disabled>Confirm</ae-button>',
  }))
  .add('AirGap Setup', () => ({
    components: { AeButton },
    template: '<ae-button fill="alternative">Next</ae-button>',
  }))
  .add('Scan with AirGap Vault', () => ({
    components: { AeButton },
    template: `
      <div style="background: #14ccb7">
        <ae-button fill="light">Done</ae-button>
      </div>`,
  }));
