import Vue from 'vue'
import Router from 'vue-router'

import Intro from '@/components/Intro.vue'
import Setup from '@/components/Setup.vue'
import Unlock from '@/components/Unlock.vue'
import AppBrowser from '@/components/AppBrowser.vue'
import Transfer from '@/components/Transfer.vue'
import Network from '@/components/Network.vue'

Vue.use(Router)

export const PATHS = {
  ROOT: '/',
  SETUP: '/setup',
  UNLOCK: '/unlock',
  EMBEDDED_APP: '/app-browser',
  TRANSFER: '/transfer',
  NETWORK: '/network'
}

const router = new Router({
  routes: [
    {
      name: 'intro',
      path: PATHS.ROOT,
      component: Intro,
      meta: {
        title: 'Welcome',
        appClass: 'welcome'
      }
    },
    {
      name: 'setup',
      path: PATHS.SETUP,
      component: Setup,
      meta: {
        title: 'Setup',
        appClass: 'setup'
      }
    },
    {
      name: 'unlock',
      path: PATHS.UNLOCK,
      component: Unlock,
      meta: {
        title: 'Unlock',
        appClass: 'unlock'
      }
    },
    {
      name: 'app-browser',
      path: PATHS.EMBEDDED_APP,
      component: AppBrowser,
      meta: {
        title: 'App Browser',
        appClass: 'app-browser'
      }
    },
    {
      name: 'transfer',
      path: PATHS.TRANSFER,
      component: Transfer,
      meta: {
        title: 'Transfer',
        appClass: 'transfer'
      },
      children: [
        {path: ':txhash', component: Transfer}
      ]
    },
    {
      name: 'network',
      path: PATHS.NETWORK,
      component: Network,
      meta: {
        title: 'Network',
        appClass: 'network'
      }
    }
  ]
})

export default router

const _actionHandlers = {}

const _mutationHandlers = {
  'setUnlocked': function (router, state) {
    if (state.keystore) {
      if (state.unlocked) {
        // check here for registered url schemes
        if (!checkInitialQuery(router, state)) {
          // this is the default redirect if none matched
          router.push(PATHS.EMBEDDED_APP)
        }
      } else {
        router.push(PATHS.UNLOCK)
      }
    }
  },
  'setKeystore': function (router, state, currentPath) {
    if (state.keystore) {
      router.push(PATHS.UNLOCK)
    } else {
      const denyAccess = currentPath === PATHS.EMBEDDED_APP
      if (denyAccess) {
        router.push(PATHS.SETUP)
      }
    }
  }
}

const checkInitialQuery = (router, state) => {
  let initialQuery = state.initialQuery
  for (let i = 0; i < state.linkSchemes.length; i++) {
    let scheme = state.linkSchemes[i]
    if (typeof scheme === 'function') {
      if (scheme(initialQuery)) {
        console.log('found matching scheme')
        return true
      }
    }
  }
  // TODO:
  // store.commit('initialQuery', null)
  return false
}

const _pathResolvers = {}

_pathResolvers[PATHS.EMBEDDED_APP] = function (state) {
  if (!state.keystore) {
    return PATHS.SETUP
  } else if (!state.unlocked) {
    return PATHS.UNLOCK
  }
}

_pathResolvers[PATHS.UNLOCK] = function (state) {
  if (!state.keystore) {
    return PATHS.SETUP
  } else if (state.unlocked) {
    return PATHS.EMBEDDED_APP
  }
}

_pathResolvers[PATHS.SETUP] = function (state) {
  //if (state.keystore) {
    //if (state.unlocked) {
      //return PATHS.EMBEDDED_APP
    //} else {
      //return PATHS.UNLOCK
    //}
  //}
}

export const manageRouting = function (store, router) {
  router.onReady(function () {
    const currentPath = router.currentRoute.path.replace(/\/$/, '')
    if (router.currentRoute.query) {
      store.commit('initialQuery', router.currentRoute.query)
    }
    const resolver = _pathResolvers[currentPath]
    if (typeof resolver === 'function') {
      const result = resolver(store.state, currentPath)
      if (typeof result === 'string') {
        router.push(result)
      } else if (store.state.currentRoute) {
        router.push(store.state.currentRoute)
      }
    }
  })

  store.subscribe(function (mutation, state) {
    const handler = _mutationHandlers[mutation.type]
    if (typeof handler === 'function') {
      handler(router, state, router.currentPath)
    }
  })

  store.subscribeAction(function (action, state) {
    const handler = _actionHandlers[action.type]
    if (typeof handler === 'function') {
      handler(router, state)
    }
  })

  router.beforeEach(function (to, from, next) {
    if (from.path !== to.path) {
      // this doesnt catch if only the query changes
      const resolver = _pathResolvers[to.path]
      if (typeof resolver === 'function') {
        const result = resolver(store.state, from)
        if (typeof result === 'string') {
          next({path: result, replace: true})
        } else {
          next()
        }
      } else {
        next()
      }
    } else {
      next()
    }
  })
}
