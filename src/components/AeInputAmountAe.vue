<template>
  <AeInputAmount
    class="ae-input-amount-ae"
    header="Amount"
    header-right="AE"
    :footer="footer || 'Minimum tx fee'"
    :footer-right="footerRight || (footer ? '' : minSpendTxFee)"
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import AeInputAmount from './AeInputAmount.vue';
import { MIN_SPEND_TX_FEE } from '../lib/constants';
import prefixedAmount from '../filters/prefixedAmount';

export default {
  components: { AeInputAmount },
  props: {
    value: { type: [String, Number], default: '' },
    footer: { type: String, default: '' },
    footerRight: { type: String, default: '' },
  },
  data: () => ({
    minSpendTxFee: `${prefixedAmount(MIN_SPEND_TX_FEE)} AE`,
  }),
};
</script>
