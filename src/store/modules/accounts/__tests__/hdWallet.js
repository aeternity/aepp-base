/**
 * @jest-environment <rootDir>/config/jest/SdkEnvironment.js
 */
import { buildTx, unpackTx, Tag, defaultProtocolParameters } from '@aeternity/aepp-sdk';
import hdWallet from '../hdWallet';

const accountId = 'ak_2iBPH7HUz3cSDVEUWiHg76MZJ6tZooVNBmmxcgVK6VV8KAE688';

const MIN_GAS_PRICE_LOW = 1n;
const MIN_GAS_PRICE_SDK = defaultProtocolParameters.minGasPrice;

const genSpendTx = (protocolParameters) =>
  buildTx({
    tag: Tag.SpendTx,
    senderId: accountId,
    recipientId: accountId,
    nonce: 1,
    amount: 1e18,
    ...(protocolParameters != null && { protocolParameters }),
  });

/**
 * A node reporting `minGasPrice`, in the shape `getCachedProtocolParameters` reads. `withEndpoints`
 * false stands for a node that doesn't provide them, which makes the sdk fall back to the
 * parameters of its own release.
 */
const genNode = (minGasPrice, withEndpoints = true) =>
  withEndpoints
    ? {
        getProtocolParameters: async () => ({
          currentProtocolVersion: 6,
          protocols: [
            {
              version: 6,
              minimumGasPrice: minGasPrice,
              gasPerByte: defaultProtocolParameters.gasPerByte,
              txBaseGas: {},
              contractTxBaseGas: [],
              stateGasPerBlock: {},
            },
          ],
        }),
        getNodeSettings: async () => ({
          minMinerGasPrice: minGasPrice,
          blockGasLimit: defaultProtocolParameters.blockGasLimit,
          maxAuthFunGas: defaultProtocolParameters.maxAuthFunGas,
        }),
      }
    : {};

/**
 * Runs the action the way the store does, with a `modals/open` that answers the fee the modal is
 * told to preselect unless `pickFee` says otherwise.
 */
const confirmTxSigning = async (transaction, node, pickFee) => {
  const opened = [];
  const dispatch = jest.fn(async (name, props) => {
    if (name !== 'modals/open') throw new Error(`Unexpected action: ${name}`);
    opened.push(props);
    return pickFee ? pickFee(props.transaction) : props.transaction.fee;
  });
  const result = await hdWallet.actions.confirmTxSigning(
    { dispatch, rootGetters: { node } },
    { transaction },
  );
  return { result, confirmProps: opened[0] };
};

describe('confirmTxSigning', () => {
  it('serializes a transaction back to the very bytes it arrived as', async () => {
    const transaction = genSpendTx();
    const { result } = await confirmTxSigning(transaction, genNode(MIN_GAS_PRICE_SDK));
    expect(result).toBe(transaction);
  });

  it('offers the minimum the connected node prices the transaction by', async () => {
    const protocolParameters = { ...defaultProtocolParameters, minGasPrice: MIN_GAS_PRICE_LOW };
    const transaction = genSpendTx(protocolParameters);
    const { result, confirmProps } = await confirmTxSigning(
      transaction,
      genNode(MIN_GAS_PRICE_LOW),
    );

    // the transaction is priced far below what this sdk release would charge, and the minimum
    // offered is the fee it already carries rather than the one of the release
    expect(confirmProps.transaction.minFee.isEqualTo(confirmProps.transaction.fee)).toBe(true);
    expect(result).toBe(transaction);
  });

  [
    ['a node without the endpoints', genNode(null, false), false],
    // the sdk rejects rather than falls back for these, so that the caller decides — the wallet
    // decides to show what it showed before the parameters were requested at all
    [
      'a node reporting a gas price this sdk release refuses',
      genNode(MIN_GAS_PRICE_SDK * 2000n),
      true,
    ],
  ].forEach(([name, node, warns]) =>
    it(`falls back to the sdk release parameters for ${name}`, async () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      try {
        const protocolParameters = { ...defaultProtocolParameters, minGasPrice: MIN_GAS_PRICE_LOW };
        const transaction = genSpendTx(protocolParameters);
        const { result, confirmProps } = await confirmTxSigning(transaction, node);

        // no parameters to price by, so the minimum is the one of this sdk release, above the fee
        // the transaction carries — as it was before the parameters were requested at all
        expect(confirmProps.transaction.minFee.isGreaterThan(confirmProps.transaction.fee)).toBe(
          true,
        );
        // and the transaction is still serialized as it arrived rather than rejected
        expect(result).toBe(transaction);
        expect(warn).toHaveBeenCalledTimes(warns ? 1 : 0);
      } finally {
        warn.mockRestore();
      }
    }),
  );

  it('puts the fee picked in the modal into the transaction it returns', async () => {
    const transaction = genSpendTx();
    const { result, confirmProps } = await confirmTxSigning(
      transaction,
      genNode(MIN_GAS_PRICE_SDK),
      ({ minFee }) => minFee.multipliedBy(2),
    );
    expect(unpackTx(result).fee).toBe(
      confirmProps.transaction.minFee.multipliedBy(2).shiftedBy(18).toFixed(),
    );
  });
});
