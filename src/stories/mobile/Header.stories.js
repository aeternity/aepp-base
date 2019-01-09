/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import MobileHeader from '../../components/mobile/Header.vue';
import { lorem } from '../mock-data';

const base = {
  components: { MobileHeader },
};

storiesOf('mobile Header', module)
  .add('default', () => ({
    ...base,
    template: `
      <div style="margin: -8px">
        <mobile-header
          title="Test"
          fill="primary"
          left-button-icon-name="back"
          right-button-icon-name="close"
          @left-button-click="leftButtonClickHandler"
          @right-button-click="rightButtonClickHandler"
        />
        <p v-for="paragraph in lorem">
          {{ paragraph }}
        </p>
      </div>
    `,
    methods: {
      leftButtonClickHandler: action('left-button-click'),
      rightButtonClickHandler: action('right-button-click'),
    },
    data: () => ({ lorem: [...lorem, ...lorem, ...lorem, ...lorem] }),
  }))
  .add('AirGap Setup', () => ({
    ...base,
    template: `
      <mobile-header
        title="AirGap Setup"
        style="margin: -8px"
        left-button-icon-name="back"
        left-button-to="http://example.com"
      />
    `,
  }));
