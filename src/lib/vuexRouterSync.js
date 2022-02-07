import { sync } from 'vuex-router-sync';

export default (store, router) => {
  store.registerModule('router', {
    namespaced: true,
    actions: {
      push: (context, payload) => router.push(payload),
      replace: (context, payload) => router.replace(payload),
      go: (context, payload) => router.go(payload),
      back: (context, payload) => router.back(payload),
      forward: (context, payload) => router.forward(payload),
      addRoute: (context, payload) => router.addRoute(payload),
    },
  });

  sync(store, router);
};
