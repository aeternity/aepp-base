/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

const currencies = {
  usd: {
    name: 'US Dollar',
    symbol: '$',
    isCrypto: false,
  },
  eur: {
    name: 'Euro',
    symbol: '€',
    isCrypto: false,
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
    state: Object.assign({
      activeCode: preferredCurrencyCode,
      swapped: false,
    }, store.state.currencies),
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
