import Vue from 'vue'
import Router from 'vue-router'

import Intro from '@/components/Intro.vue'
import Setup from '@/components/Setup.vue'
import Unlock from '@/components/Unlock.vue'
import AppBrowser from '@/components/AppBrowser.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      name : 'intro',
      path: '/',
      component: Intro,
      meta: {
        title: 'Welcome',
        appClass: 'welcome'
      }
    },
    {
      name : 'setup',
      path: '/setup',
      component: Setup,
      meta: {
        title: 'Setup',
        appClass: 'setup'
      }
    },
    {
      name : 'unlock',
      path: '/unlock',
      component: Unlock,
      meta: {
        title: 'Unlock',
        appClass: 'unlock'
      }
    },
    {
      name : 'app-browser',
      path: '/app-browser',
      component: AppBrowser,
      meta: {
        title: 'App Browser',
        appClass: 'app-browser'
      }
    }
  ]
})

export default router
