import BigNumber from 'bignumber.js';

export default (value, rate) => value.multipliedBy(rate).precision(18, BigNumber.ROUND_FLOOR);
