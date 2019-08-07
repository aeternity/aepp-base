const toFiatFixedValue = v => (v.e < -2 ? '0.01' : v.toFixed(2));

export default (value, { symbol, isCrypto = false }) => {
  if (typeof value === 'string') return `${value} ${symbol}`;
  const v = isCrypto ? value.toFixed(8) : toFiatFixedValue(value);
  return `${!isCrypto ? symbol : ''}${v} ${isCrypto ? symbol : ''}`;
};
