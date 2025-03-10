import BigNumber from 'bignumber.js';
import { buildTx, unpackTx, Tag } from '@aeternity/aepp-sdk';
import { MAGNITUDE, MAGNITUDE_MICRO } from './constants';

const STUB_ADDRESS = 'ak_enAPooFqpTQKkhJmU47J16QZu9HbPQQPwWBVeGnzDbDnv9dxp';

export const calculateMinSpendTxFee = (options) =>
  unpackTx(
    buildTx({
      ...options,
      tag: Tag.SpendTx,
      senderId: STUB_ADDRESS,
      recipientId: STUB_ADDRESS,
    }),
    Tag.SpendTx,
  ).fee;

const MAX_UINT256 = BigNumber(2).exponentiatedBy(256).minus(1);
const MIN_SPEND_TX_FEE_STRING = calculateMinSpendTxFee({
  amount: MAX_UINT256,
  ttl: MAX_UINT256,
  nonce: MAX_UINT256,
});

export const MIN_SPEND_TX_FEE = BigNumber(MIN_SPEND_TX_FEE_STRING).shiftedBy(-MAGNITUDE);
export const MAX_REASONABLE_FEE = MIN_SPEND_TX_FEE.multipliedBy(10);

const toMicro = (value) => value.shiftedBy(-MAGNITUDE_MICRO).toFixed();

export const MIN_SPEND_TX_FEE_MICRO = toMicro(MIN_SPEND_TX_FEE);
export const MAX_REASONABLE_FEE_MICRO = toMicro(MAX_REASONABLE_FEE);
