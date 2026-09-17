import { pick } from 'lodash-es';
import BigNumber from 'bignumber.js';
import { MAGNITUDE } from '../lib/constants';
import { calculateMinSpendTxFee } from '../lib/spendTxFees';
import getProtocolParameters from '../lib/protocolParameters';

export default {
  data: () => ({
    customAmount: '',
    maxSelected: false,
    minFee: BigNumber(0),
  }),
  computed: {
    max() {
      const max = this.activeAccount.balance.minus(this.minFee);
      return (max.isPositive() ? max : 0).toString();
    },
    amount: {
      get() {
        return this.maxSelected ? this.max : this.customAmount;
      },
      set(value) {
        if (value === this.max) this.maxSelected = true;
        else {
          this.customAmount = value;
          this.maxSelected = false;
        }
      },
    },
  },
  subscriptions() {
    return pick(this.$store.state.observables, ['activeAccount']);
  },
  async mounted() {
    // requested before the watcher so that the fee it computes matches the one `spend` puts into
    // the transaction it builds against this node — otherwise "max" leaves too little for the fee
    // on a network repriced above this SDK release, and the spend fails for insufficient balance
    const [height, protocolParameters] = await Promise.all([
      this.$store.getters.sdk.getHeight({ cached: true }),
      getProtocolParameters(this.$store.getters.node),
    ]);
    this.$watch(
      ({ activeAccount: { nonce }, amount }) => ({ nonce, amount }),
      async ({ nonce, amount }) => {
        const minFeeString = calculateMinSpendTxFee(
          {
            amount: BigNumber(amount > 0 ? amount : 0).shiftedBy(MAGNITUDE),
            nonce: nonce + 1,
            ttl: height + 3,
          },
          protocolParameters,
        );
        const minFee = BigNumber(minFeeString).shiftedBy(-MAGNITUDE);
        if (!minFee.isEqualTo(this.minFee)) this.minFee = minFee;
      },
      { immediate: true },
    );
  },
};
