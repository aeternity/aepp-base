import { pick } from 'lodash-es';
import BigNumber from 'bignumber.js';
import { MAGNITUDE } from '../lib/constants';
import { calculateMinSpendTxFee } from '../lib/spendTxFees';

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
    const height = await this.$store.getters.sdk.getHeight({ cached: true });
    this.$watch(
      ({ activeAccount: { nonce }, amount }) => ({ nonce, amount }),
      async ({ nonce, amount }) => {
        const minFeeString = calculateMinSpendTxFee({
          amount: BigNumber(amount > 0 ? amount : 0).shiftedBy(MAGNITUDE),
          nonce: nonce + 1,
          ttl: height + 3,
        });
        const minFee = BigNumber(minFeeString).shiftedBy(-MAGNITUDE);
        if (!minFee.isEqualTo(this.minFee)) this.minFee = minFee;
      },
      { immediate: true },
    );
  },
};
