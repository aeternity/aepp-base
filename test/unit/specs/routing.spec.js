import createRouter, {NAMES} from '@/router/index'

describe('router/index.js', function () {
  const NO_OP = () => {
  }

  describe('guarding routes', function () {
    const createStoreMock = (store) => ({
      subscribe: NO_OP,
      ...store
    })

    describe('routing when route change is requested', function () {
      const getBeforeEnterHandler = (state, fromName) => {
        const RouterClass = sinon.spy()
        createRouter(createStoreMock({ state }), RouterClass)
        const exposedOptions = RouterClass.firstCall.args[0]
        expect(exposedOptions).to.be.a('object')
        const {routes} = exposedOptions
        expect(routes).to.be.instanceOf(Array)
        const routeOption = routes.filter(r => r.name === fromName)[0]
        return routeOption.beforeEnter
      }

      const getNextArg = beforeEnter => {
        const next = sinon.spy()
        beforeEnter(undefined, undefined, next)
        expect(next).to.have.been.calledOnce
        return next.firstCall.args[0]
      }

      const createRedirectTest = function (state, fromName, expectedRedirectName) {
        return function () {
          const beforeEnter = getBeforeEnterHandler(state, fromName)
          expect(beforeEnter).to.be.a('function')
          const exposedNextArg = getNextArg(beforeEnter)
          expect(exposedNextArg.name).to.be.equal(expectedRedirectName)
        }
      }

      const createNoRedirectTest = function (state, fromName) {
        return function () {
          const beforeEnter = getBeforeEnterHandler(state, fromName)
          const handlerType = typeof beforeEnter
          expect(['function', 'undefined']).to.include(handlerType)
          if (handlerType === 'function') {
            const exposedNextArg = getNextArg(beforeEnter)
            expect(exposedNextArg).to.be.a('undefined')
          }
        }
      }

      it(
        'pushes SETUP path if current route is APP_BROWSER and no keystore is present',
        createRedirectTest({}, NAMES.APP_BROWSER, NAMES.SETUP)
      )

      it(
        'pushes SETUP path if current route is UNLOCK and no keystore is present',
        createRedirectTest({}, NAMES.UNLOCK, NAMES.SETUP)
      )

      it(
        'pushes UNLOCK path if current route is APP_BROWSER and keystore is present but not unlocked',
        createRedirectTest({
          keystore: {}, unlocked: false
        }, NAMES.APP_BROWSER, NAMES.UNLOCK)
      )

      it(
        'does NOT redirect if current route is SETUP and keystore is present but not unlocked',
        createNoRedirectTest({
          keystore: {}, unlocked: false
        }, NAMES.SETUP)
      )

      it(
        'pushes APP_BROWSER path if current route is UNLOCK and keystore is present and unlocked',
        createRedirectTest({
          keystore: {}, unlocked: true
        }, NAMES.UNLOCK, NAMES.APP_BROWSER)
      )

      it(
        'does NOT redirect if current route is SETUP and keystore is present and unlocked',
        createNoRedirectTest({
          keystore: {}, unlocked: true
        }, NAMES.SETUP)
      )

      it('does not interfere when current route is APP_BROWSER and keystore is present and unlocked',
        createNoRedirectTest({
          keystore: {}, unlocked: true
        }, NAMES.APP_BROWSER)
      )

      it('does not interfere when current route is SETUP and no keystore is present',
        createNoRedirectTest({}, NAMES.SETUP)
      )

      it('does not interfere when current route is UNLOCK and keystore is present but unlocked',
        createNoRedirectTest({
          keystore: {}, unlocked: false
        }, NAMES.UNLOCK)
      )

      it('does not interfere when current route is INTRO', function () {
        createNoRedirectTest({}, NAMES.INTRO)()
        createNoRedirectTest({
          keystore: {}, unlocked: false
        }, NAMES.INTRO)()
        createNoRedirectTest({
          keystore: {}, unlocked: true
        }, NAMES.INTRO)()
      })
    })

    describe('listening on mutations', function () {
      const RouterClass = function () {
        this.push = sinon.spy()
      }

      const createRedirectTest = function (state, mutationType, expectedRedirect, currentPath) {
        return function () {
          const subscribe = sinon.spy()
          const mutation = {type: mutationType}
          const routerMock = createRouter(createStoreMock({ subscribe }), RouterClass)
          const exposedHandler = subscribe.firstCall.args[0]
          exposedHandler(mutation, state)
          expect(routerMock.push).to.have.been.calledOnce
          expect(routerMock.push).to.have.been.calledWith({name: expectedRedirect})
        }
      }

      it('registers a listener for vuex mutations', () => {
        const subscribe = sinon.spy()
        createRouter(createStoreMock({ subscribe }))
        const exposedHandler = subscribe.firstCall.args[0]

        expect(subscribe).to.have.been.calledOnce
        expect(exposedHandler).to.be.a('function')
      })

      it(
        'redirects to UNLOCK path when setKeystore mutation is triggered and keystore is present',
        createRedirectTest(
          {keystore: {}}, 'setKeystore', NAMES.UNLOCK
        )
      )

      it(
        'redirects to SETUP path when setKeystore mutation is triggered, keystore is NOT present and current path is APP_BROWSER',
        createRedirectTest(
          {keystore: {}}, 'setKeystore', NAMES.UNLOCK, NAMES.APP_BROWSER
        )
      )

      it(
        'redirects to APP_BROWSER path when setUnlocked mutation is triggered and keystore is present and unlocked',
        createRedirectTest(
          {keystore: {}, unlocked: true}, 'setUnlocked', NAMES.APP_BROWSER
        )
      )

      it(
        'redirects to UNLOCK path when setUnlocked mutation is triggered and keystore is present but locked',
        createRedirectTest(
          {keystore: {}, unlocked: false}, 'setUnlocked', NAMES.UNLOCK
        )
      )
    })
  })
})
