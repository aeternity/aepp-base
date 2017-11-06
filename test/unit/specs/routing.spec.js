import {manageRouting, PATHS} from '@/router/index'

describe('router/index.js', function () {
  const NO_OP = () => {}

  describe('guarding routes', function () {
    const createStoreMock = () => {
      return {
        subscribe: NO_OP,
        subscribeAction: NO_OP
      }
    }

    describe('routing when router is ready', function () {
      const createRedirectTest = function (state, currentPath, expectedRedirect) {
        return function () {
          const storeMock = createStoreMock()
          storeMock.state = state

          let exposedHandler
          const onReady = handler => {
            exposedHandler = handler
          }
          let exposedPath
          const push = sinon.spy((path) => {
            exposedPath = path
          })
          const routerMock = {
            onReady,
            beforeEach: NO_OP,
            push,
            currentRoute: {path: currentPath}
          }

          manageRouting(storeMock, routerMock)
          exposedHandler()
          expect(push).to.have.been.calledOnce
          expect(exposedPath).to.be.equal(expectedRedirect)
        }
      }

      const createNoRedirectTest = function (state, currentPath) {
        return function () {
          const storeMock = createStoreMock()
          storeMock.state = state

          let exposedHandler
          const onReady = handler => {
            exposedHandler = handler
          }
          const push = sinon.spy()
          const routerMock = {
            onReady,
            beforeEach: NO_OP,
            push,
            currentRoute: {path: currentPath}
          }
          manageRouting(storeMock, routerMock)
          exposedHandler()
          expect(push).not.to.have.been.called
        }
      }

      it('registers handler for event', function () {
        let exposedHandler

        const onReady = sinon.spy(handler => {
          exposedHandler = handler
        })

        const routerMock = {
          onReady,
          beforeEach: NO_OP
        }

        manageRouting(createStoreMock(), routerMock)
        expect(onReady).to.have.been.calledOnce
        expect(exposedHandler).to.be.a('function')
      })

      it(
        'pushes SETUP path if current route is EMBEDDED_APP and no keystore is present',
        createRedirectTest({}, PATHS.EMBEDDED_APP, PATHS.SETUP)
      )

      it(
        'pushes SETUP path if current route is UNLOCK and no keystore is present',
        createRedirectTest({}, PATHS.UNLOCK, PATHS.SETUP)
      )

      it(
        'pushes UNLOCK path if current route is EMBEDDED_APP and keystore is present but not unlocked',
        createRedirectTest({
          keystore: {}, unlocked: false
        }, PATHS.EMBEDDED_APP, PATHS.UNLOCK)
      )

      it(
        'pushes UNLOCK path if current route is SETUP and keystore is present but not unlocked',
        createRedirectTest({
          keystore: {}, unlocked: false
        }, PATHS.SETUP, PATHS.UNLOCK)
      )

      it(
        'pushes EMBEDDED_APP path if current route is UNLOCK and keystore is present and unlocked',
        createRedirectTest({
          keystore: {}, unlocked: true
        }, PATHS.UNLOCK, PATHS.EMBEDDED_APP)
      )

      it(
        'pushes EMBEDDED_APP path if current route is SETUP and keystore is present and unlocked',
        createRedirectTest({
          keystore: {}, unlocked: true
        }, PATHS.SETUP, PATHS.EMBEDDED_APP)
      )

      it('does not interfere when current route is EMBEDDED_APP and keystore is present and unlocked',
        createNoRedirectTest({
          keystore: {}, unlocked: true
        }, PATHS.EMBEDDED_APP)
      )

      it('does not interfere when current route is SETUP and no keystore is present',
        createNoRedirectTest({}, PATHS.SETUP)
      )

      it('does not interfere when current route is UNLOCK and keystore is present but unlocked',
        createNoRedirectTest({
          keystore: {}, unlocked: false
        }, PATHS.UNLOCK)
      )

      it('does not interfere when current route is ROOT', function () {
        createNoRedirectTest({}, PATHS.ROOT)()
        createNoRedirectTest({
          keystore: {}, unlocked: false
        }, PATHS.ROOT)()
        createNoRedirectTest({
          keystore: {}, unlocked: true
        }, PATHS.ROOT)()
      })
    })

    describe('routing when route change is requested', function () {
      const prepareTest = function (state, toPath, fromPath) {
        const storeMock = createStoreMock()
        storeMock.state = state

        let exposedHandler
        const beforeEach = handler => {
          exposedHandler = handler
        }

        const routerMock = {
          onReady: NO_OP,
          beforeEach
        }

        let exposedNextRoute
        const next = sinon.spy((nextRoute) => {
          exposedNextRoute = nextRoute
        })

        const to = {path: toPath}
        const from = {path: fromPath || ''}

        manageRouting(storeMock, routerMock)
        exposedHandler(to, from, next)

        return {next, exposedNextRoute}
      }

      const createRedirectTest = function (state, toPath, expectedRedirect, fromPath) {
        return function () {
          const {next, exposedNextRoute} = prepareTest(state, toPath, fromPath)
          expect(next).to.have.been.calledOnce
          expect(exposedNextRoute).to.be.a('object')
          expect(exposedNextRoute.path).to.be.equal(expectedRedirect)
        }
      }

      const createNoRedirectTest = function (state, toPath, fromPath) {
        return function () {
          const {next, exposedNextRoute} = prepareTest(state, toPath, fromPath)
          expect(next).to.have.been.calledOnce
          expect(exposedNextRoute).to.be.a('undefined')
        }
      }

      it('registers handler for event', function () {
        let exposedHandler

        const beforeEach = sinon.spy((handler) => {
          exposedHandler = handler
        })

        const routerMock = {
          onReady: NO_OP,
          beforeEach
        }

        manageRouting(createStoreMock(), routerMock)
        expect(beforeEach).to.have.been.calledOnce
        expect(exposedHandler).to.be.a('function')
      })

      it(
        'redirects to SETUP path when routing to EMBEDDED_APP is requested and no keystore is present',
        createRedirectTest({}, PATHS.EMBEDDED_APP, PATHS.SETUP)
      )

      it(
        'redirects to SETUP path when routing to UNLOCK is requested and no keystore is present',
        createRedirectTest({}, PATHS.UNLOCK, PATHS.SETUP)
      )

      it(
        'redirects to UNLOCK path when routing to EMBEDDED_APP is requested and keystore is present but not unlocked',
        createRedirectTest({
          keystore: {}, unlocked: false
        }, PATHS.EMBEDDED_APP, PATHS.UNLOCK)
      )

      it(
        'redirects to UNLOCK path when routing to SETUP is requested and keystore is present but not unlocked',
        createRedirectTest({
          keystore: {}, unlocked: false
        }, PATHS.SETUP, PATHS.UNLOCK)
      )

      it(
        'redirects to EMBEDDED_APP path when routing to UNLOCK is requested and keystore is present and unlocked',
        createRedirectTest({
          keystore: {}, unlocked: true
        }, PATHS.UNLOCK, PATHS.EMBEDDED_APP)
      )

      it(
        'redirects to EMBEDDED_APP path when routing to SETUP is requested  and keystore is present and unlocked',
        createRedirectTest({
          keystore: {}, unlocked: true
        }, PATHS.SETUP, PATHS.EMBEDDED_APP)
      )

      it('does not interfere when requested route is EMBEDDED_APP and keystore is present and unlocked',
        createNoRedirectTest({
          keystore: {}, unlocked: true
        }, PATHS.EMBEDDED_APP)
      )

      it('does not interfere when requested route is SETUP and no keystore is present',
        createNoRedirectTest({}, PATHS.SETUP)
      )

      it('does not interfere when requested route is UNLOCK and keystore is present but unlocked',
        createNoRedirectTest({
          keystore: {}, unlocked: false
        }, PATHS.UNLOCK)
      )

      it('does not interfere when requested route is ROOT', function () {
        createNoRedirectTest({}, PATHS.ROOT)()
        createNoRedirectTest({
          keystore: {}, unlocked: false
        }, PATHS.ROOT)()
        createNoRedirectTest({
          keystore: {}, unlocked: true
        }, PATHS.ROOT)()
      })
    })
  })

  describe('listening on mutations', function () {
    const createRouterMock = () => {
      return {
        onReady: NO_OP,
        beforeEach: NO_OP,
        push: sinon.spy()
      }
    }

    const createRedirectTest = function (state, mutationType, expectedRedirect, currentPath) {
      return function () {
        let exposedHandler
        const subscribe = sinon.spy(handler => {
          exposedHandler = handler
        })

        const storeMock = {
          subscribe,
          subscribeAction: NO_OP
        }
        const routerMock = createRouterMock()
        const mutation = {type: mutationType}
        manageRouting(storeMock, routerMock)
        exposedHandler(mutation, state, currentPath)
        expect(routerMock.push).to.have.been.calledOnce
        expect(routerMock.push).to.have.been.calledWith(expectedRedirect)
      }
    }

    it('registers a listener for vuex mutations', function () {
      let exposedHandler
      const subscribe = sinon.spy(handler => {
        exposedHandler = handler
      })

      const storeMock = {
        subscribe,
        subscribeAction: NO_OP
      }

      manageRouting(storeMock, createRouterMock())
      expect(subscribe).to.have.been.calledOnce
      expect(exposedHandler).to.be.a('function')
    })

    it(
      'redirects to UNLOCK path when setKeystore mutation is triggered and keystore is present',
      createRedirectTest(
        {keystore: {}}, 'setKeystore', PATHS.UNLOCK
      )
    )

    it(
      'redirects to SETUP path when setKeystore mutation is triggered, keystore is NOT present and current path is EMBEDDED_APP',
      createRedirectTest(
        {keystore: {}}, 'setKeystore', PATHS.UNLOCK, PATHS.EMBEDDED_APP
      )
    )

    it(
      'redirects to EMBEDDED_APP path when setUnlocked mutation is triggered and keystore is present and unlocked',
      createRedirectTest(
        {keystore: {}, unlocked: true}, 'setUnlocked', PATHS.EMBEDDED_APP
      )
    )

    it(
      'redirects to UNLOCK path when setUnlocked mutation is triggered and keystore is present but locked',
      createRedirectTest(
        {keystore: {}, unlocked: false}, 'setUnlocked', PATHS.UNLOCK
      )
    )
  })

  describe('listening on actions', function () {
    const createRouterMock = () => {
      return {
        onReady: NO_OP,
        beforeEach: NO_OP
      }
    }

    it('registers a listener for vuex actions', function () {
      let exposedHandler
      const subscribeAction = sinon.spy(handler => {
        exposedHandler = handler
      })

      const storeMock = {
        subscribe: NO_OP,
        subscribeAction
      }

      manageRouting(storeMock, createRouterMock())
      expect(subscribeAction).to.have.been.calledOnce
      expect(exposedHandler).to.be.a('function')
    })
  })
})
