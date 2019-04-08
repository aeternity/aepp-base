<template>
  <DetailsItem class="details-amount-and-fee">
    <DetailsRow class="transfer-amount">
      <span class="name">
        Amount
      </span>
      <span class="value">
        {{ amount | prefixedAmount }} AE
      </span>
    </DetailsRow>

    <DetailsRow>
      <span class="name">
        Transaction Fee
      </span>
      <span class="value">
        {{ fee | prefixedAmount }} AE
      </span>
    </DetailsRow>

    <DetailsRow class="transfer-total">
      <span class="name">
        Total
      </span>
      <span class="value">
        {{ amount.plus(fee) | prefixedAmount }} AE
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
    fee: { type: BigNumber, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.details-amount-and-fee {
  .details-row {
    .name {
      @extend %face-sans-xs;
      font-weight: 500;
      color: $color-neutral-negative-1;
    }

    .value {
      @extend %face-mono-xs;
      color: $color-neutral-negative-1;
      text-transform: uppercase;
    }
  }

  .transfer-amount {
    margin-bottom: rem(8px);
  }

  .transfer-total {
    margin-top: rem(20px);

    .name, .value {
      color: $color-neutral-negative-3;
    }

    .value {
      font-size: rem(23px);
    }
  }
}
</style>
