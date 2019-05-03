/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import Vuex from 'vuex';
import VueRx from 'vue-rx';
import { Observable } from 'rxjs';
import { storiesOf } from '@storybook/vue';
import AeInputAddress from '../components/AeInputAddress.vue';
import { accounts } from './mock-data';

Vue.use(Vuex);
Vue.use(VueRx);
Vue.prototype.$globals = {
  IS_MOBILE_DEVICE: true,
};
const store = new Vuex.Store({
  state: {
    observables: {
      inactiveAccounts: new Observable(subscriber => subscriber.next(accounts)),
    },
  },
});

storiesOf('AeInputAddress', module)
  .add('default', () => ({
    components: { AeInputAddress },
    template: `
      <div>
        <ae-input-address
          header="Header"
          header-right="Header right"
          v-model="value"
        />
        Value: {{ value }}
      </div>`,
    store,
    data: () => ({ value: '' }),
  }))
  .add('mobile', () => ({
    components: { AeInputAddress },
    template: '<ae-input-address header="Recipient" />',
    store,
  }), {
    notes: {
      markdown: `
[send mobile](https://app.zeplin.io/project/59e4cf99fc0bb2f99a89551b/screen/5bf548432790467ebfb0dbf1) 
`,
    },
  })
  .add('desktop', () => ({
    components: { AeInputAddress },
    template: `
      <ae-input-address
        header="To"
        v-model="value"
      />`,
    beforeCreate: () => {
      Vue.prototype.$globals.IS_MOBILE_DEVICE = false;
    },
    destroyed: () => {
      Vue.prototype.$globals.IS_MOBILE_DEVICE = true;
    },
    store,
    data: () => ({ value: '' }),
  }), {
    notes: {
      markdown: `
[send desktop](https://app.zeplin.io/project/59e4cf99fc0bb2f99a89551b/screen/5c1a4cebb233e172489bf076)
`,
    },
  });
