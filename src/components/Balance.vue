<template>
  <span
    :class="{ invert, swapped, convertable }"
    class="balance"
    @click="swapPrices"
  >
    <span
      v-if="leftVisible && convertable && !active.isCrypto"
      class="left"
    >
      {{ prices.left }}
    </span>
    <small v-if="convertable">⇄</small>
    <span class="right">
      {{ prices.right }}
    </span>
  </span>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import BigNumber from 'bignumber.js';
import prefixedAmount from '../filters/prefixedAmount';
import currencyAmount from '../filters/currencyAmount';

export default {
  filters: { currencyAmount, prefixedAmount },
  props: {
    balance: {
      type: BigNumber,
      required: true,
    },
    invert: Boolean,
    convertable: Boolean,
    leftVisible: Boolean,
  },
  computed: {
    ...mapState('currencies', ['swapped']),
    ...mapGetters('currencies', ['active']),
    prices() {
      const leftPrice = currencyAmount(this.balance.multipliedBy(this.rate), this.active);
      const rightPrice = currencyAmount(prefixedAmount(this.balance), { symbol: 'AE' });
      return {
        left: this.swapped ? rightPrice : leftPrice,
        right: this.swapped ? leftPrice : rightPrice,
      };
    },
  },
  subscriptions() {
    return { rate: this.$store.state.observables.rate };
  },
  methods: {
    swapPrices() {
      if (!this.convertable) return;
      this.$store.commit('currencies/swapCurrencies');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/placeholders/typography.scss';
@import '../styles/variables/colors.scss';

.balance {
  @extend %face-mono-base;
  font-weight: normal;
  line-height: normal;
  color: $color-neutral-negative-3;

  .left {
    color: $color-neutral-negative-1;
    font-size: rem(13px);
  }

  &:not(.convertable) {
    @extend %face-mono-xs;
    letter-spacing: normal;
    font-weight: 500;
    color: $color-neutral-negative-1;
  }

  &.invert {
    color: #fff;

    .left {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>
