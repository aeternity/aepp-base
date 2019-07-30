<template>
  <DetailsItem class="details-amount-and-fee">
    <DetailsRow>
      <span class="name">
        {{ $t('transfer.transaction.details.amount') }}
      </span>
      <span class="value">
        {{ amount | prefixedAmount }} AE
      </span>
    </DetailsRow>

    <DetailsRow>
      <span class="name">
        {{ $t('transfer.transaction.details.fee') }}
      </span>
      <span class="value">
        {{ fee | prefixedAmount }} AE
      </span>
    </DetailsRow>

    <DetailsRow class="transfer-total">
      <span class="name">
        {{ $t('transfer.transaction.details.total') }}
      </span>
      <span class="value">
        {{ amount.plus(fee) | prefixedAmount }}<small> AE</small>
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
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.details-amount-and-fee .details-row {
  color: var(--color-secondary, rgba($color-neutral-maximum, 0.66846));
  font-weight: 500;

  & + .details-row {
    margin-top: rem(8px);
  }

  .name {
    @extend %face-sans-xs;
  }

  .value {
    @extend %face-mono-xs;
    text-transform: uppercase;
  }

  &.transfer-total {
    align-items: baseline;
    margin-top: rem(20px);
    color: var(--color-primary, $color-neutral-maximum);

    .value {
      font-size: rem(23px);
      line-height: rem(23px);
      font-weight: normal;

      small {
        font-size: rem(13px);
        font-weight: 500;
      }
    }
  }
}
</style>
