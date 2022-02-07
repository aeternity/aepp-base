import { pick } from 'lodash-es';
import BigNumber from 'bignumber.js';
import { TxBuilder } from '@aeternity/aepp-sdk';
import { MAGNITUDE } from '../lib/constants';

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
  mounted() {
    this.$watch(
      ({ activeAccount: { address, nonce }, amount }) => ({ address, nonce, amount }),
      async ({ address, nonce, amount }) => {
        const sdk = this.$store.state.sdk.then
          ? await this.$store.state.sdk : this.$store.state.sdk;
        const minFee = BigNumber(TxBuilder.calculateMinFee('spendTx', {
          gas: sdk.Ae.defaults.gas,
          params: {
            ...sdk.Ae.defaults,
            senderId: address,
            recipientId: address,
            amount: BigNumber(amount > 0 ? amount : 0).shiftedBy(MAGNITUDE),
            ttl: 0,
            nonce: nonce + 1,
            payload: '',
          },
        })).shiftedBy(-MAGNITUDE);
        if (!minFee.isEqualTo(this.minFee)) this.minFee = minFee;
      },
      { immediate: true },
    );
  },
};
