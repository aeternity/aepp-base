<template>
  <span :class="{ invert }" class="balance" @click="swapCurrencies">
    <span class="left">{{ prices[0] }}</span>
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
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
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.balance {
  @extend %face-mono-base;
  font-weight: normal;
  line-height: normal;
  color: variables.$color-neutral-negative-3;

  .left {
    color: variables.$color-neutral-negative-1;
    font-size: functions.rem(13px);
  }

  &.invert {
    color: #fff;

    .left {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>
