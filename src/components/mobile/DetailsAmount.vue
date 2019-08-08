<template>
  <DetailsField
    class="details-amount"
    :name="name"
    :value="`${prefixedAmount(amount)} AE`"
    value-monospace
  />
</template>

<script>
import BigNumber from 'bignumber.js';
import DetailsField from './DetailsField.vue';
import prefixedAmount from '../../filters/prefixedAmount';

export default {
  components: { DetailsField },
  props: {
    name: {
      type: String,
      default() { return this.$t('transfer.amount'); },
    },
    amount: { type: BigNumber, required: true },
  },
  methods: { prefixedAmount },
};
</script>
