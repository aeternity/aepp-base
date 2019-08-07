<template>
  <AeInputAmount
    class="ae-input-amount-ae"
    :header="$t('transfer.amount')"
    :footer="footer || (max ? '' : $t('transfer.send.amount.fee'))"
    :footer-right="footerRight || (footer || max ? '' : minSpendTxFee)"
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span
      slot="header-right"
      @click="swapCurrencies"
    >
      {{ swapped ? active.symbol : 'AE' }}
    </span>
    <AeToolbarButton
      v-if="max"
      slot="footer-right"
      type="button"
      :active="max === value"
      @click="$emit('input', max)"
    >
      {{ $t('transfer.send.amount.max') }}
    </AeToolbarButton>
  </AeInputAmount>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import AeInputAmount from './AeInputAmount.vue';
import AeToolbarButton from './AeToolbarButton.vue';
import { MIN_SPEND_TX_FEE } from '../lib/constants';
import prefixedAmount from '../filters/prefixedAmount';

export default {
  components: { AeInputAmount, AeToolbarButton },
  props: {
    value: { type: [String, Number], default: '' },
    max: { type: [String, Number], default: '' },
    footer: { type: String, default: '' },
    footerRight: { type: String, default: '' },
  },
  data: () => ({
    minSpendTxFee: `${prefixedAmount(MIN_SPEND_TX_FEE)} AE`,
  }),
  computed: {
    ...mapGetters('currencies', ['active']),
    ...mapState('currencies', ['swapped']),
  },
  methods: mapMutations('currencies', ['swapCurrencies']),
};
</script>
