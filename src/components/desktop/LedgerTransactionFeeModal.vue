<template>
  <ledger-modal
    title="Define the Transaction fee"
    class="transaction-fee"
    closable
    @close="handleClose"
  >
    <form
      :id="_uid"
      @submit.prevent="handleSubmit"
    >
      <ae-input-amount
        v-model="fee"
        v-validate="{
          required: true,
          decimal,
          min_value: MIN_SPEND_TX_FEE_PICO,
          max_value: MAX_REASONABLE_FEE_PICO,
        }"
        :error="errors.has('fee')"
        :footer="errors.first('fee')"
        autofocus
        header="Transaction Fee"
        header-right="Pico AE"
        name="fee"
        step="0.001"
      />

      <ae-input-range
        v-model="fee"
        :min="MIN_SPEND_TX_FEE_PICO"
        :max="MAX_REASONABLE_FEE_PICO"
        step="0.001"
      />
    </form>

    <ledger-modal-note fill="dark">
      A higher transaction fee leads to a faster
      <br>transaction time.
    </ledger-modal-note>

    <ae-button
      slot="footer"
      size="small"
      plain
      :form="_uid"
    >
      Next
    </ae-button>
  </ledger-modal>
</template>

<script>
import BigNumber from 'bignumber.js';
import LedgerModal from './LedgerModal.vue';
import AeInputAmount from '../AeInputAmount.vue';
import AeInputRange from '../AeInputRange.vue';
import LedgerModalNote from './LedgerModalNote.vue';
import AeButton from '../AeButton.vue';
import {
  MAGNITUDE, MIN_SPEND_TX_FEE, MAX_REASONABLE_FEE, MAGNITUDE_PICO,
} from '../../lib/constants';

const toPico = value => BigNumber(value)
  .shiftedBy(-MAGNITUDE - MAGNITUDE_PICO).toFixed();
const MIN_SPEND_TX_FEE_PICO = toPico(MIN_SPEND_TX_FEE);
const MAX_REASONABLE_FEE_PICO = toPico(MAX_REASONABLE_FEE);

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
    fee: MIN_SPEND_TX_FEE_PICO,
    decimal: MAGNITUDE + MAGNITUDE_PICO,
    MIN_SPEND_TX_FEE_PICO,
    MAX_REASONABLE_FEE_PICO,
  }),
  methods: {
    async handleSubmit() {
      if (!await this.$validator.validateAll()) return;

      this.resolve(BigNumber(this.fee).shiftedBy(MAGNITUDE_PICO));
    },
    handleClose() {
      this.reject(new Error('Canceled by user'));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.transaction-fee {
  .ledger-image {
    background: #333745;
    width: rem(220px);
    height: rem(50px);
    margin: rem(60px) auto;
  }

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
