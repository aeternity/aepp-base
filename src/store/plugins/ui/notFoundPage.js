import NotFound from '../../../pages/NotFound.vue';

export default store => store.dispatch(
  'router/addRoutes',
  [{
    name: 'not-found',
    path: '*',
    component: NotFound,
  }],
);
