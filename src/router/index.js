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

const _actionHandlers = {
  'init': function (paths, state, router) {
    if (state.keystore) {
      router.push({ path: paths.UNLOCK })
    }
  }
}

const _pathResolvers = {}

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
  store.subscribeAction(function (action, state) {
    const handler = _actionHandlers[action.type]
    if (typeof handler === 'function') {
      handler(state, router)
    }
  })

  router.beforeEach(function (to, from, next) {
    if (from.path !== to.path) {
      const resolver = _pathResolvers[to.path]
      if (typeof resolver === 'function') {
        const result = resolver(paths, store.state, from)
        const nextArgument = typeof result === 'string' ?
          {path: result, replace: true} : result
        next(nextArgument)
      } else {
        next()
      }
    }
  })
}
