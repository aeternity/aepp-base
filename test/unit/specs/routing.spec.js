import { createLocalVue } from '@vue/test-utils'
import Router from 'vue-router'
import { noop } from 'lodash'
import createRouter from '@/router'

const localVue = createLocalVue()
localVue.use(Router)

describe('router/index.js', () => {
  describe('guarding routes', () => {
    const createStoreMock = (store) => ({
      subscribe: noop,
      ...store
    })

    describe('routing when route change is requested', () => {
      const createRedirectTest = (state, fromName, expectedRedirectName) => () => {
        const router = createRouter(createStoreMock({ state }))
        router.push({ name: fromName })
        expect(router.currentRoute.name).to.be.equal(expectedRedirectName)
      }

      const createNoRedirectTest = (state, fromName) =>
        createRedirectTest(state, fromName, fromName)

      it(
        'pushes INTRO path if current route is APPS and no encMnemonic is present',
        createRedirectTest({}, 'apps', 'intro')
      )

      it(
        'pushes NEW_ACCOUNT path if current route is LOGIN and no encMnemonic is present',
        createRedirectTest({}, 'login', 'new-account')
      )

      it(
        'pushes LOGIN path if current route is APPS and encMnemonic is present but not unlocked',
        createRedirectTest({
          encMnemonic: 'mnemonic', unlocked: false
        }, 'apps', 'login')
      )

      it(
        'does NOT redirect if current route is NEW_ACCOUNT and encMnemonic is present but not unlocked',
        createNoRedirectTest({
          encMnemonic: 'mnemonic', unlocked: false
        }, 'new-account')
      )

      it(
        'pushes APPS path if current route is LOGIN and encMnemonic is present and unlocked',
        createRedirectTest({
          encMnemonic: 'mnemonic', unlocked: true
        }, 'login', 'apps')
      )

      it(
        'does NOT redirect if current route is NEW_ACCOUNT and encMnemonic is present and unlocked',
        createNoRedirectTest({
          encMnemonic: 'mnemonic', unlocked: true
        }, 'new-account')
      )

      it('does not interfere when current route is APPS and encMnemonic is present and unlocked',
        createNoRedirectTest({
          encMnemonic: 'mnemonic', unlocked: true
        }, 'apps')
      )

      it('does not interfere when current route is NEW_ACCOUNT and no encMnemonic is present',
        createNoRedirectTest({}, 'new-account')
      )

      it('does not interfere when current route is LOGIN and encMnemonic is present but locked',
        createNoRedirectTest({
          encMnemonic: 'mnemonic', unlocked: false
        }, 'login')
      )

      it('does not interfere when current route is INTRO', () => {
        createNoRedirectTest({}, 'intro')()
      })
    })

    describe('listening on mutations', () => {
      const createRedirectTest = (state, mutationType, expectedRedirect, currentRouteName) =>
        () => {
          const subscribe = sinon.spy()
          const router = createRouter(createStoreMock({ subscribe, state }))
          const exposedHandler = subscribe.firstCall.args[0]
          if (currentRouteName) router.push({ name: currentRouteName })
          exposedHandler({ type: mutationType }, state)
          expect(router.currentRoute.name).to.equal(expectedRedirect)
        }

      it('registers a listener for vuex mutations', () => {
        const subscribe = sinon.spy()

        createRouter(createStoreMock({ subscribe }))
        expect(subscribe).to.have.been.calledOnce
        expect(subscribe.firstCall.args[0]).to.be.a('function')
      })

      it(
        'redirects to APPS path when setUnlocked mutation is triggered and hdWallet is present and is unlocked',
        createRedirectTest(
          {encMnemonic: 'mnemonic', hdWallet: {}, unlocked: true}, 'setUnlocked', 'apps'
        )
      )

      it(
        'redirects to LOGIN path when setUnlocked mutation is triggered and hdWallet is present but locked',
        createRedirectTest(
          {encMnemonic: 'mnemonic', hdWallet: {}, unlocked: false}, 'setUnlocked', 'login'
        )
      )
    })
  })
})
