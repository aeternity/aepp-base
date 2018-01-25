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
        'pushes SETUP path if current route is APP_BROWSER and no keystore is present',
        createRedirectTest({}, 'app-browser', 'setup')
      )

      it(
        'pushes SETUP path if current route is UNLOCK and no keystore is present',
        createRedirectTest({}, 'unlock', 'setup')
      )

      it(
        'pushes UNLOCK path if current route is APP_BROWSER and keystore is present but not unlocked',
        createRedirectTest({
          keystore: {}, unlocked: false
        }, 'app-browser', 'unlock')
      )

      it(
        'does NOT redirect if current route is SETUP and keystore is present but not unlocked',
        createNoRedirectTest({
          keystore: {}, unlocked: false
        }, 'setup')
      )

      it(
        'pushes APP_BROWSER path if current route is UNLOCK and keystore is present and unlocked',
        createRedirectTest({
          keystore: {}, unlocked: true
        }, 'unlock', 'app-browser')
      )

      it(
        'does NOT redirect if current route is SETUP and keystore is present and unlocked',
        createNoRedirectTest({
          keystore: {}, unlocked: true
        }, 'setup')
      )

      it('does not interfere when current route is APP_BROWSER and keystore is present and unlocked',
        createNoRedirectTest({
          keystore: {}, unlocked: true
        }, 'app-browser')
      )

      it('does not interfere when current route is SETUP and no keystore is present',
        createNoRedirectTest({}, 'setup')
      )

      it('does not interfere when current route is UNLOCK and keystore is present but unlocked',
        createNoRedirectTest({
          keystore: {}, unlocked: false
        }, 'unlock')
      )

      it('does not interfere when current route is INTRO', () => {
        createNoRedirectTest({}, 'intro')()
        createNoRedirectTest({
          keystore: {}, unlocked: false
        }, 'intro')()
        createNoRedirectTest({
          keystore: {}, unlocked: true
        }, 'intro')()
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
        'redirects to UNLOCK path when setKeystore mutation is triggered and keystore is present',
        createRedirectTest(
          {keystore: {}}, 'setKeystore', 'unlock'
        )
      )

      it(
        'redirects to SETUP path when setKeystore mutation is triggered, keystore is NOT present and current path is APP_BROWSER',
        createRedirectTest(
          {keystore: {}}, 'setKeystore', 'unlock', 'app-browser'
        )
      )

      it(
        'redirects to APP_BROWSER path when setUnlocked mutation is triggered and keystore is present and unlocked',
        createRedirectTest(
          {keystore: {}, unlocked: true}, 'setUnlocked', 'app-browser'
        )
      )

      it(
        'redirects to UNLOCK path when setUnlocked mutation is triggered and keystore is present but locked',
        createRedirectTest(
          {keystore: {}, unlocked: false}, 'setUnlocked', 'unlock'
        )
      )
    })
  })
})
