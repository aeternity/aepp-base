<template>
  <ConfirmModalField
    class="confirm-modal-amount"
    name="Amount"
    :value="`${prefixedAmount(amount)} AE`"
  />
</template>

<script>
import BigNumber from 'bignumber.js';
import ConfirmModalField from './ConfirmModalField.vue';
import prefixedAmount from '../../filters/prefixedAmount';

export default {
  components: { ConfirmModalField },
  props: {
    amount: { type: BigNumber, required: true },
  },
  methods: { prefixedAmount },
};
</script>
