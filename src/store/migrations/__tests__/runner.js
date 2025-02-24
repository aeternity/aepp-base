import Vue from 'vue';
import Vuex from 'vuex';
import runMigrations, { registerMigration } from '../runner';

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.use(Vuex);

registerMigration({
  migrate: (state) => ({ ...state, test: 1 }),
});

registerMigration({
  migrate: (state) => ({ ...state, test: 2 }),
});

describe('migration runner', () => {
  it('set latest version if state is empty', () => {
    expect(runMigrations(null)).toEqual({ migrations: { 0: true, 1: true } });
  });

  it('applies the thirst migration', () => {
    expect(runMigrations({ migrations: { 1: true } })).toEqual({
      test: 1,
      migrations: { 0: true, 1: true },
    });
  });

  it('applies the second migration', () => {
    expect(runMigrations({ migrations: { 0: true } })).toEqual({
      test: 2,
      migrations: { 0: true, 1: true },
    });
  });

  it('applies both migrations', () => {
    expect(runMigrations({})).toEqual({
      test: 2,
      migrations: { 0: true, 1: true },
    });
  });

  it('applies async migration', async () => {
    const testStore = new Vuex.Store({
      state: {},
      mutations: {
        markMigrationAsApplied(state, migrationId) {
          Vue.set(state.migrations, migrationId, true);
        },
        setTest(state) {
          Vue.set(state, 'test', 3);
        },
      },
    });

    registerMigration({
      migrate: (state, store) =>
        new Promise((r) => {
          setTimeout(() => {
            store.commit('setTest');
            r();
          });
        }),
    });

    const state = runMigrations(testStore.state, testStore);
    testStore.replaceState(state);

    expect(state).toEqual({
      test: 2,
      migrations: { 0: true, 1: true },
    });

    await new Promise((resolve) => {
      testStore.subscribe(({ type }) => {
        if (type === 'markMigrationAsApplied') {
          expect(testStore.state).toEqual({
            test: 3,
            migrations: { 0: true, 1: true, 2: true },
          });
          resolve();
        }
      });
    });
  });
});
