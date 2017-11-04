import {manageRouting, PATHS} from "@/router/index"

describe('router/index.js', () => {
  const _manageRouting = manageRouting.bind(undefined, PATHS) // fixed first argument
  const NO_OP = () => {}

  describe('guarding routes', () => {
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

          _manageRouting(storeMock, routerMock)
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
          _manageRouting(storeMock, routerMock)
          exposedHandler()
          expect(push).not.to.have.been.called
        }
      }

      it('registers handler for event', function () {
        let exposedHandler

        const onReady = sinon.spy((handler) => {
          exposedHandler = handler
        })

        const routerMock = {
          onReady,
          beforeEach: NO_OP
        }

        _manageRouting(createStoreMock(), routerMock)
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
  })
})
