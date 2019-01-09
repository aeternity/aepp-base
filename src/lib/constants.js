import BigNumber from 'bignumber.js';

export const MAGNITUDE = 18;
export const MAGNITUDE_EXA = 18;
export const MAGNITUDE_GIGA = 9;
export const MAGNITUDE_PICO = -12;

export const BASE_GAS = 15000;
export const APPROXIMATE_SPENT_TX_LENGTH = 100;
export const GAS_PER_BYTE = 20;
export const MIN_SPEND_TX_FEE = BASE_GAS + (APPROXIMATE_SPENT_TX_LENGTH * GAS_PER_BYTE);
export const MAX_REASONABLE_FEE = MIN_SPEND_TX_FEE * 10;

const toPico = value => BigNumber(value)
  .shiftedBy(-MAGNITUDE - MAGNITUDE_PICO).toFixed();

export const MIN_SPEND_TX_FEE_PICO = toPico(MIN_SPEND_TX_FEE);
export const MAX_REASONABLE_FEE_PICO = toPico(MAX_REASONABLE_FEE);
