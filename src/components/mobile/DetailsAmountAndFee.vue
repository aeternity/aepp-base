<template>
  <DetailsItem class="details-amount-and-fee">
    <DetailsRow>
      <span class="name">
        {{ $t('transfer.amount') }}
      </span>
      <span class="value">
        {{ convertedAmount }}
      </span>
    </DetailsRow>

    <DetailsRow>
      <span class="name">
        {{ $t('transfer.transaction.details.fee') }}
      </span>
      <span class="value">
        <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
        {{ fee | prefixedAmount }} AE
      </span>
    </DetailsRow>

    <DetailsRow class="transfer-total">
      <span class="name">
        {{ $t('transfer.transaction.details.total') }}
      </span>
      <span class="value">
        <Balance
          :balance="amount.plus(fee)"
          short
        />
      </span>
    </DetailsRow>
  </DetailsItem>
</template>

<script>
import BigNumber from 'bignumber.js';
import DetailsItem from './DetailsItem.vue';
import DetailsRow from './DetailsRow.vue';
import Balance from '../Balance.vue';
import prefixedAmount from '../../filters/prefixedAmount';

export default {
  components: { DetailsItem, DetailsRow, Balance },
  filters: { prefixedAmount },
  props: {
    amount: { type: BigNumber, required: true },
    fee: { type: BigNumber, required: true },
  },
  subscriptions() {
    return { convertedAmount: this.$store.state.observables.convertAmount(() => this.amount) };
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.details-amount-and-fee .details-row {
  color: var(--color-secondary, rgba(variables.$color-neutral-maximum, 0.66846));
  font-weight: 500;

  & + .details-row {
    margin-top: functions.rem(8px);
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
    margin-top: functions.rem(20px);
    color: var(--color-primary, variables.$color-neutral-maximum);
  }
}
</style>
