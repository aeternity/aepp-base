import { createLocalVue } from '@vue/test-utils'
import Router from 'vue-router'
import { noop } from 'lodash'
import createRouterInjector from 'inject-loader!@/router'

const createRouter = createRouterInjector({
  '@/lib/isMobileDevice': true
}).default

const localVue = createLocalVue()
localVue.use(Router)

describe('router/index.js', () => {
  describe('guarding routes', () => {
    const createStoreMock = (store) => {
      const state = {
        mobile: {},
        ...store.state
      }

      return {
        subscribe: noop,
        watch: noop,
        getters: {
          loggedIn: state.mobile.derivedKey
        },
        ...store,
        state
      }
    }

    describe('routing when route change is requested', () => {
      const createRedirectTest = (state, fromName, expectedRedirectName) => () => {
        const router = createRouter(createStoreMock({ state }))
        router.push({ name: fromName })
        expect(router.currentRoute.name).to.be.equal(expectedRedirectName)
      }

      const createNoRedirectTest = (state, fromName) =>
        createRedirectTest(state, fromName, fromName)

      it(
        'pushes INTRO path if current route is APPS and no keystore is present',
        createRedirectTest({}, 'apps', 'intro')
      )

      it(
        'pushes NEW_ACCOUNT path if current route is LOGIN and no keystore is present',
        createRedirectTest({}, 'login', 'new-account')
      )

      it(
        'pushes LOGIN path if current route is APPS and keystore is present but not derivedKey',
        createRedirectTest({
          mobile: { keystore: {}, derivedKey: false }
        }, 'apps', 'login')
      )

      it(
        'does NOT redirect if current route is NEW_ACCOUNT and keystore is present but not derivedKey',
        createNoRedirectTest({
          mobile: { keystore: {}, derivedKey: false }
        }, 'new-account')
      )

      it(
        'pushes APPS path if current route is LOGIN and keystore is present and derivedKey',
        createRedirectTest({
          mobile: { keystore: {}, derivedKey: true }
        }, 'login', 'apps')
      )

      it(
        'does NOT redirect if current route is NEW_ACCOUNT and keystore is present and derivedKey',
        createNoRedirectTest({
          mobile: { keystore: {}, derivedKey: true }
        }, 'new-account')
      )

      it('does not interfere when current route is APPS and keystore is present and derivedKey',
        createNoRedirectTest({
          mobile: { keystore: {}, derivedKey: true }
        }, 'apps')
      )

      it('does not interfere when current route is NEW_ACCOUNT and no keystore is present',
        createNoRedirectTest({}, 'new-account')
      )

      it('does not interfere when current route is LOGIN and keystore is present but derivedKey',
        createNoRedirectTest({
          mobile: { keystore: {}, derivedKey: false }
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
        'redirects to SET-PASSWORD path when setSeed mutation is triggered and seed is present',
        createRedirectTest(
          { mobile: { seed: true } }, 'setSeed', 'set-password'
        )
      )
    })
  })
})
