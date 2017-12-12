export const CURRENCIES = {
  AE: 'AE',
  BTC: 'BTC',
  ETH: 'ETH',
  EUR: 'EUR',
  USD: 'USD',
  CHF: 'CHF'
}

export const convertCurrency = (fromCurrency, toCurrency, value = 1) => {
  return fetch(`https://min-api.cryptocompare.com/data/price?fsym=${fromCurrency}&tsyms=${toCurrency}`).then(
    response => {
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return response.json()
      }

      return {}
    }
  ).then(body => {
    const rate = parseFloat(body[toCurrency])
    return !isNaN(rate) ? value * rate : undefined
  })
}

export const convertAE_USD = convertCurrency.bind(
  undefined, CURRENCIES.AE, CURRENCIES.USD
)

export const convertETH_USD = convertCurrency.bind(
  undefined, CURRENCIES.ETH, CURRENCIES.USD
)

export const convertAE_CHF = convertCurrency.bind(
  undefined, CURRENCIES.AE, CURRENCIES.CHF
)

export const convertETH_CHF = convertCurrency.bind(
  undefined, CURRENCIES.ETH, CURRENCIES.CHF
)
