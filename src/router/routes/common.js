import { merge } from 'lodash-es';
import { NAME_LIST_ROUTE_NAMES } from '../../lib/constants';
import { ensureLoggedIn, mergeEnterHandlers } from '../utils';
import store from '../../store/index';
import AuctionList from '../../pages/aens/AuctionList.vue';
import AuctionDetails from '../../pages/aens/AuctionDetails.vue';
import AuctionBid from '../../pages/aens/AuctionBid.vue';
import NameList from '../../pages/aens/NameList.vue';
import NameDetails from '../../pages/aens/NameDetails.vue';
import NameNew from '../../pages/aens/NameNew.vue';
import NameTransfer from '../../pages/aens/NameTransfer.vue';

export default [
  {
    name: 'auction-list-character-length',
    path: '/names/character-length/:length?/:page?',
    component: AuctionList,
    beforeEnter: mergeEnterHandlers(ensureLoggedIn, (to, from, next) =>
      next(!to.params.length ? merge({}, to, { params: { length: 6 } }) : undefined),
    ),
    props: ({ params: { length, page } }) => ({
      length: length && +length,
      page: page && +page,
      view: 'character-length',
    }),
  },
  {
    name: 'auction-details',
    path: '/names/auction/:name',
    component: AuctionDetails,
    beforeEnter: ensureLoggedIn,
    props: true,
  },
  {
    name: 'name-list',
    path: '/names',
    component: NameList,
    beforeEnter: mergeEnterHandlers(ensureLoggedIn, (to, from, next) => {
      if (NAME_LIST_ROUTE_NAMES.includes(from.name)) return next(undefined);
      const { nameListRouteParams: params } = store.state;
      if (params && params.name === 'name-list') return next(undefined);
      return next(params || undefined);
    }),
  },
  {
    name: 'name-details',
    path: '/names/personal/:name',
    component: NameDetails,
    beforeEnter: ensureLoggedIn,
    props: true,
  },
  {
    name: 'name-point',
    path: '/names/personal/:name/point',
    component: NameTransfer,
    beforeEnter: ensureLoggedIn,
    props: ({ params }) => ({ ...params, pointing: true }),
  },
  {
    name: 'name-transfer',
    path: '/names/personal/:name/transfer',
    component: NameTransfer,
    beforeEnter: ensureLoggedIn,
    props: true,
  },
  {
    name: 'auction-bid',
    path: '/names/bid/:name?',
    component: AuctionBid,
    beforeEnter: ensureLoggedIn,
    props: true,
  },
  {
    name: 'auction-bid-amount',
    path: '/names/bid/:name/amount',
    component: AuctionBid,
    beforeEnter: ensureLoggedIn,
    props: ({ params }) => ({ ...params, amountStep: true }),
  },
  {
    name: 'name-new',
    path: '/names/new',
    component: NameNew,
    beforeEnter: ensureLoggedIn,
  },
  {
    name: 'auction-list',
    path: '/names/:view/:page?',
    component: AuctionList,
    beforeEnter: ensureLoggedIn,
    props: ({ params: { view, page } }) => ({ view, page: page && +page }),
  },
];
