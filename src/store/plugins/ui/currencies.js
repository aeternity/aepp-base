/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import { i18n } from './languages';

const currencies = {
  usd: {
    getName: () => i18n.t('currencies.usd'),
    symbol: '$',
    isCrypto: false,
  },
  eur: {
    getName: () => i18n.t('currencies.eur'),
    symbol: '€',
    isCrypto: false,
  },
  btc: {
    getName: () => i18n.t('currencies.btc'),
    symbol: 'BTC',
    isCrypto: true,
  },
  gbp: {
    getName: () => i18n.t('currencies.gbp'),
    symbol: '£',
    isCrypto: false,
  },
  aud: {
    getName: () => i18n.t('currencies.aud'),
    symbol: '$',
    isCrypto: false,
  },
  cny: {
    getName: () => i18n.t('currencies.cny'),
    symbol: '¥',
    isCrypto: false,
  },
};

export default (store) => {
  const preferredCurrencyCode = 'eur';

  store.registerModule('currencies', {
    namespaced: true,
    state: {
      activeCode: preferredCurrencyCode,
      swapped: false,
      ...store.state.currencies,
    },
    getters: {
      list: () => Object.entries(currencies)
        .map(([code, { getName, symbol, isCrypto }]) => ({
          code, name: getName(), symbol, isCrypto,
        })),
      active: ({ activeCode }, { list }) => list.find(({ code }) => code === activeCode),
    },
    mutations: {
      setActiveCode(state, currencyCode) {
        state.activeCode = currencyCode;
      },
      swapCurrencies(state) {
        state.swapped = !state.swapped;
      },
    },
  });
};
