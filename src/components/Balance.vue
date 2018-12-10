<template>
  <div
    :class="{ invert }"
    class="balance"
  >
    {{ total ? 'Total ' : '' }}Balance
    <span class="value">{{ balance | prefixedAmount }}</span>
  </div>
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
    total: {
      type: Boolean,
      default: false,
    },
    invert: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @extend %face-sans-xs;
  font-weight: 500;
  color: $color-neutral-negative-1;

  &.invert {
    color: #fff;
  }

  .value {
    @extend %face-mono-base;
    font-weight: normal;

    &:after {
      @extend %face-mono-xs;
      content: ' AE';
    }
  }
}
</style>
