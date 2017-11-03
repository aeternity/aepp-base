import Vue from 'vue'
import Router from 'vue-router'

import Intro from '@/components/Intro.vue'
import Setup from '@/components/Setup.vue'
import Unlock from '@/components/Unlock.vue'
import AppBrowser from '@/components/AppBrowser.vue'

Vue.use(Router)

export const PATHS = {
  ROOT: '/',
  SETUP: '/setup',
  UNLOCK: '/unlock',
  EMBEDDED_APP: '/app-browser'
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
    }
  ]
})

export default router

const _actionHandlers = {}

const _mutationHandlers = {
  'setUnlocked': function (paths, router, state) {
    if (state.keystore && state.unlocked) {
      router.push(paths.EMBEDDED_APP)
    }
  },
  'setKeystore': function (paths, router, state) {
    if (state.keystore) {
      router.push(paths.UNLOCK)
    }
  }
}

const _pathResolvers = {}

_pathResolvers[PATHS.EMBEDDED_APP] = function (paths, state) {
  if (!state.keystore) {
    return paths.SETUP
  } else if (!state.unlocked) {
    return paths.UNLOCK
  }
}

_pathResolvers[PATHS.UNLOCK] = function (paths, state) {
  if (!state.keystore) {
    return paths.ROOT
  } else if (state.unlocked) {
    return paths.EMBEDDED_APP
  }
}

_pathResolvers[PATHS.SETUP] = function (paths, state) {
  if (state.keystore) {
    if (state.unlocked) {
      return paths.EMBEDDED_APP
    } else {
      return paths.UNLOCK
    }
  }
}

export const manageRouting = function (paths, vue, store, router) {
  router.onReady(function () {
    const currentPath = router.currentRoute.path
    const resolver = _pathResolvers[currentPath]
    if (typeof resolver === 'function') {
      const result = resolver(paths, store.state, currentPath)
      if (typeof result === 'string') {
        router.push(result)
      }
    }
  })

  store.subscribe(function (mutation, state) {
    const handler = _mutationHandlers[mutation.type]
    if (typeof handler === 'function') {
      handler(paths, router, state)
    }
  })

  store.subscribeAction(function (action, state) {
    const handler = _actionHandlers[action.type]
    if (typeof handler === 'function') {
      handler(paths, router, state)
    }
  })

  router.beforeEach(function (to, from, next) {
    console.log(`route request from ${from.path} to ${to.path}`)
    if (from.path !== to.path) {
      const resolver = _pathResolvers[to.path]
      if (typeof resolver === 'function') {
        const result = resolver(paths, store.state, from)
        if (typeof result === 'string') {
          next({path: result, replace: true})
        } else {
          next()
        }
      } else {
        next()
      }
    }
  })
}
