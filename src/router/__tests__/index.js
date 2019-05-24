import { createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import { noop } from 'lodash-es';
import '../../lib/initEnv';
import router from '..';
import { mockStore } from '../../store'; // eslint-disable-line import/named

jest.mock('../../lib/initEnv.js');
jest.mock('../../store');
const localVue = createLocalVue();
localVue.use(Router);

describe('router/index.js', () => {
  describe('guarding routes', () => {
    const mockRouterStore = (hdWallet = {}) => mockStore({
      subscribe: noop,
      watch: noop,
      commit: noop,
      getters: {
        loggedIn: hdWallet.wallet,
      },
      state: { accounts: { hdWallet } },
    });

    describe('routing when route change is requested', () => {
      const createRedirectTest = (hdWallet, fromName, expectedRedirectName) => () => {
        mockRouterStore(hdWallet);
        router.push({ name: fromName });
        expect(router.currentRoute.name).toBe(expectedRedirectName);
      };

      const createNoRedirectTest = (state, fromName) => createRedirectTest(
        state, fromName, fromName,
      );

      it(
        'pushes INTRO path if current route is TRANSFER and no encryptedWallet is present',
        createRedirectTest({}, 'transfer', 'intro'),
      );

      it(
        'pushes SET_PASSWORD path if current route is LOGIN and no encryptedWallet is present',
        createRedirectTest({}, 'login', 'set-password'),
      );

      it(
        'pushes LOGIN path if current route is TRANSFER and encryptedWallet is present but not wallet',
        createRedirectTest({ encryptedWallet: true, wallet: false }, 'transfer', 'login'),
      );

      it(
        'does NOT redirect if current route is SET_PASSWORD and encryptedWallet is present but not wallet',
        createNoRedirectTest({ encryptedWallet: true, wallet: false }, 'set-password'),
      );

      it(
        'pushes TRANSFER path if current route is LOGIN and encryptedWallet is present and wallet',
        createRedirectTest({ encryptedWallet: true, wallet: true }, 'login', 'transfer'),
      );

      it(
        'does NOT redirect if current route is SET_PASSWORD and encryptedWallet is present and wallet',
        createNoRedirectTest({ encryptedWallet: true, wallet: true }, 'set-password'),
      );

      it(
        'does not interfere when current route is TRANSFER and encryptedWallet is present and wallet',
        createNoRedirectTest({ encryptedWallet: true, wallet: true }, 'transfer'),
      );

      it(
        'does not interfere when current route is SET_PASSWORD and no encryptedWallet is present',
        createNoRedirectTest({}, 'set-password'),
      );

      it(
        'does not interfere when current route is LOGIN and encryptedWallet is present but wallet',
        createNoRedirectTest({ encryptedWallet: true, wallet: false }, 'login'),
      );

      it('does not interfere when current route is INTRO', () => {
        createNoRedirectTest({}, 'intro')();
      });
    });
  });
});
