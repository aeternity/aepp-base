import Vue from 'vue'
import Router from 'vue-router'

import Intro from '@/components/Intro.vue'
import Setup from '@/components/Setup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Intro,
      meta: {
        title: 'Welcome',
        appClass: 'welcome'
      }
    },
    {
      path: '/setup',
      component: Setup,
      meta: {
        title: 'Setup',
        appClass: 'setup'
      }
    },
  ]
})
