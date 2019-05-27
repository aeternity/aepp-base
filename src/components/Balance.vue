<template>
  <span
    :class="{ invert }"
    class="balance"
  >
    {{ balance | prefixedAmount }}
  </span>
</template>

<script>
import BigNumber from 'bignumber.js';
import prefixedAmount from '../filters/prefixedAmount';

export default {
  filters: { prefixedAmount },
  props: {
    balance: {
      type: BigNumber,
      required: true,
    },
    invert: {
      type: Boolean,
      default: false,
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
  color: $color-neutral-negative-1;

  &.invert {
    color: #fff;
  }

  &:after {
    @extend %face-mono-xs;
    content: 'AE';
  }
}
</style>
