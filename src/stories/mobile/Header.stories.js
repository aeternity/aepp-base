/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import PageHeader from '../../components/PageHeader.vue';
import { lorem } from '../mock-data';

const base = {
  components: { PageHeader },
};

storiesOf('Header', module)
  .add('default', () => ({
    ...base,
    template: `
      <div style="margin: -8px">
        <page-header
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
      <page-header
        title="AirGap Setup"
        style="margin: -8px"
        left-button-icon-name="back"
        left-button-to="http://example.com"
      />
    `,
  }));
