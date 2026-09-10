import Vue from 'vue';
import Vuex from 'vuex';
import modals, { registerModal, swallowModalAborted } from '../modals';

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.use(Vuex);

registerModal({ name: 'test', component: { render: (h) => h('div') } });

const genStore = () => new Vuex.Store({ state: {}, plugins: [modals] });

describe('modals', () => {
  it('opens a modal and resolves it with what it was answered', async () => {
    const store = genStore();
    const promise = store.dispatch('modals/open', { name: 'test' });
    expect(store.getters['modals/opened']).toHaveLength(1);
    store.getters['modals/opened'][0].props.resolve('answer');
    await expect(promise).resolves.toBe('answer');
    expect(store.getters['modals/opened']).toHaveLength(0);
  });

  it('rejects an opened modal when the signal aborts', async () => {
    const store = genStore();
    const controller = new AbortController();
    const promise = store.dispatch('modals/open', { name: 'test', signal: controller.signal });
    expect(store.getters['modals/opened']).toHaveLength(1);
    controller.abort();
    await expect(promise).rejects.toThrow('Modal aborted');
    expect(store.getters['modals/opened']).toHaveLength(0);
  });

  it('opens nothing for a signal aborted before the call', async () => {
    const store = genStore();
    const controller = new AbortController();
    controller.abort();
    const promise = store.dispatch('modals/open', { name: 'test', signal: controller.signal });
    // a modal opened here would stay open forever: the abort it waits for has already happened
    expect(store.getters['modals/opened']).toHaveLength(0);
    // and the rejection is the one `swallowModalAborted` knows, not a failure to close
    await expect(promise).rejects.toThrow('Modal aborted');
    await expect(promise.catch(swallowModalAborted)).resolves.toBeUndefined();
  });
});
