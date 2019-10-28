<template>
  <span
    :class="{ invert }"
    class="balance"
    @click="swapCurrencies"
  >
    <span class="left">{{ prices[0] }}</span>
    <small> ⇄ </small>
    <span class="right">{{ prices[1] }}</span>
  </span>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import BigNumber from 'bignumber.js';

export default {
  props: {
    balance: {
      type: BigNumber,
      required: true,
    },
    invert: Boolean,
    short: Boolean,
  },
  computed: mapState('currencies', {
    prices({ swapped }, { active }) {
      const prices = [this.balanceSwapped, this.balanceNotSwapped];
      if (swapped) prices.reverse();
      if (active.isCrypto || this.short) {
        prices[0] = swapped ? 'AE' : active.symbol;
      }
      return prices;
    },
  }),
  subscriptions() {
    return {
      balanceSwapped: this.$store.state.observables.convertAmount(() => this.balance, true),
      balanceNotSwapped: this.$store.state.observables.convertAmount(() => this.balance, false),
    };
  },
  methods: mapMutations('currencies', ['swapCurrencies']),
};
</script>

<style lang="scss" scoped>
@import '../styles/typography';

.balance {
  @extend %face-mono-base;
  font-weight: normal;
  line-height: normal;
  color: $color-neutral-negative-3;

  .left {
    color: $color-neutral-negative-1;
    font-size: rem(13px);
  }

  &.invert {
    color: #fff;

    .left {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>
