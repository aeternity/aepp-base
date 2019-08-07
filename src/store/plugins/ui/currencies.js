/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

const currencies = {
  usd: {
    name: 'US Dollar',
    symbol: '$',
  },
  eur: {
    name: 'Euro',
    symbol: '€',
  },
  btc: {
    name: 'Bitcoin',
    symbol: 'BTC',
    isCrypto: true,
  },
};

export default async (store) => {
  const preferredCurrencyCode = 'eur';

  store.registerModule('currencies', {
    namespaced: true,
    state: {
      activeCode: preferredCurrencyCode,
      swapped: false,
      referenceCurrency: 'aeternity',
    },
    getters: {
      list: () => Object.entries(currencies)
        .map(([code, { name, symbol, isCrypto }]) => ({
          code, name, symbol, isCrypto,
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
