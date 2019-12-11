<template>
  <DetailsField
    class="details-amount-currency"
    :name="name"
  >
    <Balance
      slot="value"
      v-bind="$attrs"
      :balance="amount"
    />
  </DetailsField>
</template>

<script>
import BigNumber from 'bignumber.js';
import DetailsField from './DetailsField.vue';
import Balance from '../Balance.vue';

export default {
  components: { DetailsField, Balance },
  props: {
    name: {
      type: String,
      default() { return this.$t('transfer.amount'); },
    },
    amount: { type: BigNumber, required: true },
  },
};
</script>

<style lang="scss" scoped>
.details-amount-currency .balance {
  font-weight: inherit;

  &, >>> .left {
    color: inherit;
    font-size: inherit;
  }
}
</style>
