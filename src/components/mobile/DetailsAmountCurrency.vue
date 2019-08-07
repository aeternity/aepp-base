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
import prefixedAmount from '../../filters/prefixedAmount';

export default {
  components: { DetailsField, Balance },
  props: {
    name: { type: String, default: 'Amount' },
    amount: { type: BigNumber, required: true },
  },
  methods: { prefixedAmount },
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.balance {
  font-size: rem(13px);
}
</style>
