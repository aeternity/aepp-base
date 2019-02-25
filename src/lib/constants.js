import BigNumber from 'bignumber.js';

export const MAGNITUDE = 18;
export const MAGNITUDE_EXA = 18;
export const MAGNITUDE_GIGA = 9;
export const MAGNITUDE_PICO = -12;

export const MIN_SPEND_TX_FEE = BigNumber('16700000000000').shiftedBy(-MAGNITUDE);
export const MAX_REASONABLE_FEE = MIN_SPEND_TX_FEE.multipliedBy(10);

const toPico = value => value.shiftedBy(-MAGNITUDE_PICO).toFixed();

export const MIN_SPEND_TX_FEE_PICO = toPico(MIN_SPEND_TX_FEE);
export const MAX_REASONABLE_FEE_PICO = toPico(MAX_REASONABLE_FEE);
