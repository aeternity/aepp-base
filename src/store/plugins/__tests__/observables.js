import Vue from 'vue';
import VueRx from 'vue-rx';
import Vuex from 'vuex';
import observables from '../observables';

Vue.use(VueRx);
Vue.use(Vuex);

it('observables inactiveAccounts: emits value even if only one account', () => {
  const store = new Vuex.Store({
    plugins: [observables],
    state: {
      sdk: {
        balance: () => '0',
      },
      accounts: {
        list: [{}],
        activeIdx: 0,
      },
    },
  });
  const handler = jest.fn();
  store.state.observables.inactiveAccounts.subscribe(handler);
  expect(handler).toHaveBeenCalledWith([]);
});
