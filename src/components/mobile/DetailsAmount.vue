<template>
  <DetailsField
    class="details-amount"
    name="Amount"
    :value="`${prefixedAmount(amount)} AE`"
  />
</template>

<script>
import BigNumber from 'bignumber.js';
import DetailsField from './DetailsField.vue';
import prefixedAmount from '../../filters/prefixedAmount';

export default {
  components: { DetailsField },
  props: {
    amount: { type: BigNumber, required: true },
  },
  methods: { prefixedAmount },
};
</script>
