// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router, {PATHS, manageRouting} from './router/index'
import store from './store'

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   console.log(to.name === 'id-manager' && !store.state.unlocked);
//   if(to.name === 'id-manager' && !store.state.unlocked) {
//     console.log(to.name, from.name);
//     next(false)
//     console.log(to.name, from );
//     next({ replace: true, name: 'unlock' })
//   }
// })

/* eslint-disable no-new */
const IdentityApp = Vue.extend({
  render: h => h(App),
  components: { App },
  store,
  router,
  methods: {
  },
  beforeCreate: function () {
    console.log('before')
  },
  mounted: function () {
    this.$store.dispatch('init')
    console.log('mounted')
  }
})
const vm = new IdentityApp()
manageRouting(PATHS, store, router)
vm.$mount('#app')
