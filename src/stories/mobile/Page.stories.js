/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import Vuex from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import AeInputAmountAe from '../../components/AeInputAmountAe.vue';
import { account, lorem } from '../mock-data';

const rootStyles = `
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const base = {
  store: new Vuex.Store({
    state: {
      mobile: {
        browserPath: '',
      },
    },
    getters: {
      'accounts/active': () => account,
    },
  }),
  components: { MobilePage },
  template: `
    <div style="${rootStyles}">
      <mobile-page
        title="Test"
        header-fill="primary"
        left-button-icon-name="back"
        right-button-icon-name="close"
        hide-tab-bar
        @left-button-click="leftButtonClickHandler"
        @right-button-click="rightButtonClickHandler"
      >
        <template slot="header">
          <strong>Header</strong>
          {{ lorem }}
        </template>

        <strong>Content</strong>
        {{ lorem }}

        <template slot="footer">
          <strong>Footer</strong>
          {{ lorem.slice(0, 200) }}
        </template>
      </mobile-page>
    </div>
  `,
  methods: {
    leftButtonClickHandler: action('left-button-click'),
    rightButtonClickHandler: action('right-button-click'),
  },
  mounted() {
    document.body.style.margin = '0';
  },
};

storiesOf('mobile Page', module)
  .add('default', () => ({
    ...base,
    data: () => ({ lorem: lorem[4] }),
  }))
  .add('input at header end', () => ({
    ...base,
    components: { MobilePage, AeInputAmountAe },
    template: `
      <div style="${rootStyles}">
        <mobile-page
          title="Test"
          header-fill="primary"
          left-button-icon-name="back"
          right-button-icon-name="close"
          hide-tab-bar
          @left-button-click="leftButtonClickHandler"
          @right-button-click="rightButtonClickHandler"
        >
          <template slot="header">
            <strong>Header</strong>
            {{ lorem }}
            <ae-input-amount-ae
              header="Test"
              placeholder="Test"
            />
          </template>
    
          <strong>Content</strong>
          {{ lorem }}
        </mobile-page>
      </div>`,
    data: () => ({ lorem: lorem.join(' ') }),
  }))
  .add('long', () => ({
    ...base,
    data: () => ({ lorem: lorem.join(' ') }),
  }));
