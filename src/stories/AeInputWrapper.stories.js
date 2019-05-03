/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import AeInputWrapper from '../components/AeInputWrapper.vue';

storiesOf('AeInputWrapper', module)
  .add('default', () => ({
    components: { AeInputWrapper },
    template: `
      <ae-input-wrapper
        header="Header"
        header-right="Header right"
        footer="Footer"
        footer-right="Footer right"
      >
        <input
          slot-scope="{ setFocus, id }"
          :id="id"
          @focus="setFocus(true)"
          @blur="setFocus(false)"
        />
      </ae-input-wrapper>`,
  }))
  .add('error', () => ({
    components: { AeInputWrapper },
    template: `
      <ae-input-wrapper
        error
        header="Header"
        header-right="Header right"
        footer="Footer"
        footer-right="Footer right"
      >
        <input
          slot-scope="{ setFocus, id }"
          :id="id"
          @focus="setFocus(true)"
          @blur="setFocus(false)"
        />
      </ae-input-wrapper>`,
  }));
