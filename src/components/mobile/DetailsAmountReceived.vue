<template>
  <DetailsItem>
    <DetailsRow class="details-amount-received">
      <span class="name">
        Amount
      </span>
      <span class="value">
        {{ amount | prefixedAmount }}<small> AE</small>
      </span>
    </DetailsRow>
  </DetailsItem>
</template>

<script>
import BigNumber from 'bignumber.js';
import DetailsItem from './DetailsItem.vue';
import DetailsRow from './DetailsRow.vue';
import prefixedAmount from '../../filters/prefixedAmount';

export default {
  components: { DetailsItem, DetailsRow },
  filters: { prefixedAmount },
  props: {
    amount: { type: BigNumber, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.details-amount-received {
  align-items: baseline;
  color: var(--color-primary, $color-neutral-maximum);

  .name {
    @extend %face-sans-xs;
    font-weight: 500;
  }

  .value {
    @extend %face-mono-xs;
    text-transform: uppercase;
    font-size: rem(23px);
    line-height: rem(23px);

    small {
      font-size: rem(13px);
      font-weight: 500;
    }
  }
}
</style>
