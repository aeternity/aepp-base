export const CURRENCIES = {
  AE: 'AE',
  BTC: 'BTC',
  ETH: 'ETH',
  EUR: 'EUR',
  USD: 'USD',
  CHF: 'CHF',
};

export const convertCurrency = (fromCurrency, toCurrency, value = 1) => fetch(`https://min-api.cryptocompare.com/data/price?fsym=${fromCurrency}&tsyms=${toCurrency}`).then((response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return {};
}).then((body) => {
  const rate = parseFloat(body[toCurrency]);
  return !Number.isNaN(rate) ? value * rate : undefined;
});

export const convertAEtoUSD = convertCurrency.bind(undefined, CURRENCIES.AE, CURRENCIES.USD);

export const convertETHtoUSD = convertCurrency.bind(undefined, CURRENCIES.ETH, CURRENCIES.USD);

export const convertAEtoCHF = convertCurrency.bind(undefined, CURRENCIES.AE, CURRENCIES.CHF);

export const convertETHtoCHF = convertCurrency.bind(undefined, CURRENCIES.ETH, CURRENCIES.CHF);
