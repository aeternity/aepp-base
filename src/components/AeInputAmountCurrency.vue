<template>
  <AeInputAmount
    class="ae-input-amount-ae"
    :header="$t('transfer.amount')"
    :footer="footer || (max ? '' : $t('transfer.send.amount.fee'))"
    :footer-right="footerRight || (footer || max ? '' : minSpendTxFee)"
    :value="internalValue"
    v-bind="$attrs"
    v-on="{ ...$listeners, input }"
  >
    <span
      slot="header-right"
      @click="swapCurrencies"
    >
      {{ symbol }}
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
import { pick } from 'lodash-es';
import { mapState, mapMutations } from 'vuex';
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
    internalValue: '',
    lastEmitedInternalValue: null,
  }),
  computed: mapState('currencies', {
    swapped: 'swapped',
    symbol: ({ swapped }, { active: { symbol } }) => (swapped ? symbol : 'AE'),
  }),
  subscriptions() {
    return pick(this.$store.state.observables, ['rate']);
  },
  watch: {
    value: {
      handler(value) {
        if (this.lastEmitedInternalValue === value) return;
        this.updateInternalValue();
      },
      immediate: true,
    },
    swapped: 'updateInternalValue',
  },
  created() {
    this.$watch(
      ({ rate }) => rate,
      () => {
        if (!this.swapped) return;
        if (this.value === this.max) this.updateInternalValue();
        else this.emitInternalValue();
      },
    );
  },
  methods: {
    ...mapMutations('currencies', ['swapCurrencies']),
    updateInternalValue() {
      const { value } = this;
      this.internalValue = value && (this.swapped ? value * this.rate : value);
    },
    input(value) {
      this.internalValue = value;
      this.emitInternalValue();
    },
    emitInternalValue() {
      const value = this.internalValue;
      this.lastEmitedInternalValue = value && (this.swapped ? value / this.rate : value).toString();
      this.$emit('input', this.lastEmitedInternalValue);
    },
  },
};
</script>
