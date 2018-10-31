import { createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import { noop } from 'lodash-es';
import '../../lib/initEnv';
import router from '../';
import { mockStore } from '../../store';

jest.mock('../../lib/initEnv.js');
jest.mock('../../store');
const localVue = createLocalVue();
localVue.use(Router);

describe('router/index.js', () => {
  describe('guarding routes', () => {
    const mockRouterStore = (store) => {
      const state = {
        mobile: {},
        ...store.state,
      };

      mockStore({
        subscribe: noop,
        watch: noop,
        commit: noop,
        getters: {
          loggedIn: state.mobile.derivedKey,
        },
        ...store,
        state,
      });
    };

    describe('routing when route change is requested', () => {
      const createRedirectTest = (state, fromName, expectedRedirectName) => () => {
        mockRouterStore({ state });
        router.push({ name: fromName });
        expect(router.currentRoute.name).toBe(expectedRedirectName);
      };

      const createNoRedirectTest = (state, fromName) =>
        createRedirectTest(state, fromName, fromName);

      it(
        'pushes INTRO path if current route is ACCOUNTS and no keystore is present',
        createRedirectTest({}, 'accounts', 'intro'),
      );

      it(
        'pushes NEW_ACCOUNT path if current route is LOGIN and no keystore is present',
        createRedirectTest({}, 'login', 'new-account'),
      );

      it(
        'pushes LOGIN path if current route is ACCOUNTS and keystore is present but not derivedKey',
        createRedirectTest({
          mobile: { keystore: {}, derivedKey: false },
        }, 'accounts', 'login'),
      );

      it(
        'does NOT redirect if current route is NEW_ACCOUNT and keystore is present but not derivedKey',
        createNoRedirectTest({
          mobile: { keystore: {}, derivedKey: false },
        }, 'new-account'),
      );

      it(
        'pushes ACCOUNTS path if current route is LOGIN and keystore is present and derivedKey',
        createRedirectTest({
          mobile: { keystore: {}, derivedKey: true },
        }, 'login', 'accounts'),
      );

      it(
        'does NOT redirect if current route is NEW_ACCOUNT and keystore is present and derivedKey',
        createNoRedirectTest({
          mobile: { keystore: {}, derivedKey: true },
        }, 'new-account'),
      );

      it(
        'does not interfere when current route is APPS and keystore is present and derivedKey',
        createNoRedirectTest({
          mobile: { keystore: {}, derivedKey: true },
        }, 'accounts'),
      );

      it(
        'does not interfere when current route is NEW_ACCOUNT and no keystore is present',
        createNoRedirectTest({}, 'new-account'),
      );

      it(
        'does not interfere when current route is LOGIN and keystore is present but derivedKey',
        createNoRedirectTest({
          mobile: { keystore: {}, derivedKey: false },
        }, 'login'),
      );

      it('does not interfere when current route is INTRO', () => {
        createNoRedirectTest({}, 'intro')();
      });
    });
  });
});
