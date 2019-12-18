<template>
  <LedgerModal
    :title="$t('ledger.modal.transaction-fee.title')"
    class="transaction-fee"
    closable
    @close="handleClose"
  >
    <form
      :id="_uid"
      @submit.prevent="handleSubmit"
    >
      <AeInputAmount
        v-model="fee"
        v-validate="{
          required: true,
          decimal,
          min_value: MIN_SPEND_TX_FEE_MICRO,
          max_value: MAX_REASONABLE_FEE_MICRO,
        }"
        :error="errors.has('fee')"
        :footer="errors.first('fee')"
        autofocus
        :header="$t('ledger.modal.transaction-fee.fee')"
        :header-right="$t('ledger.modal.transaction-fee.micro-ae')"
        name="fee"
        step="0.01"
      />

      <AeInputRange
        v-model="fee"
        :min="MIN_SPEND_TX_FEE_MICRO"
        :max="MAX_REASONABLE_FEE_MICRO"
        step="0.01"
      />
    </form>

    <LedgerModalNote fill="dark">
      {{ $t('ledger.modal.transaction-fee.note') }}
    </LedgerModalNote>

    <AeButton
      slot="footer"
      size="small"
      plain
      :form="_uid"
    >
      {{ $t('next') }}
    </AeButton>
  </LedgerModal>
</template>

<script>
import BigNumber from 'bignumber.js';
import LedgerModal from './LedgerModal.vue';
import AeInputAmount from '../AeInputAmount.vue';
import AeInputRange from '../AeInputRange.vue';
import LedgerModalNote from './LedgerModalNote.vue';
import AeButton from '../AeButton.vue';
import { MAGNITUDE, MAGNITUDE_MICRO } from '../../lib/constants';
import { MIN_SPEND_TX_FEE_MICRO, MAX_REASONABLE_FEE_MICRO } from '../../lib/spendTxFees';

export default {
  components: {
    LedgerModal,
    AeInputAmount,
    AeInputRange,
    LedgerModalNote,
    AeButton,
  },
  props: {
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
  },
  data: () => ({
    fee: MIN_SPEND_TX_FEE_MICRO,
    decimal: MAGNITUDE + MAGNITUDE_MICRO,
    MIN_SPEND_TX_FEE_MICRO,
    MAX_REASONABLE_FEE_MICRO,
  }),
  methods: {
    async handleSubmit() {
      if (!await this.$validator.validateAll()) return;

      this.resolve(BigNumber(this.fee).shiftedBy(MAGNITUDE_MICRO));
    },
    handleClose() {
      this.reject(new Error('Cancelled by user'));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/functions';

.transaction-fee {
  .ae-input-amount {
    margin: rem(60px) auto;
    width: rem(311px);
  }

  .ae-input-range {
    display: block;
    margin: rem(40px) auto;
    width: rem(279px);
  }

  .ae-button {
    float: right;
  }
}
</style>
