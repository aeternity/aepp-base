import NotFound from '../../../pages/NotFound.vue';

export default (store) => store.dispatch(
  'router/addRoute',
  {
    name: 'not-found',
    path: '*',
    component: NotFound,
  },
);
