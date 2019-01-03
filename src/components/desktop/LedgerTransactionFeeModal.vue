<template>
  <ledger-modal
    title="Define the Transaction fee"
    class="transaction-fee"
    closable
  >
    <form
      :id="_uid"
      @submit.prevent="setTransactionFee"
    >
      <ae-input-amount
        v-model="fee"
        v-validate="{
          required: true,
          decimal: MAGNITUDE,
          min_value: MIN_SPEND_TX_FEE,
          max_value: MAX_REASONABLE_FEE,
        }"
        :error="errors.has('fee')"
        :footer="errors.first('fee')"
        header="Transaction Fee"
        header-right="Pico AE"
        name="fee"
      />

      <ae-input-range
        v-model="fee"
        :min="MIN_SPEND_TX_FEE"
        :max="MAX_REASONABLE_FEE"
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
import LedgerModal from './LedgerModal.vue';
import AeInputAmount from '../AeInputAmount.vue';
import AeInputRange from '../AeInputRange.vue';
import LedgerModalNote from './LedgerModalNote.vue';
import AeButton from '../AeButton.vue';
import { MAGNITUDE, MIN_SPEND_TX_FEE, MAX_REASONABLE_FEE } from '../../lib/constants';

export default {
  components: {
    LedgerModal,
    AeInputAmount,
    AeInputRange,
    LedgerModalNote,
    AeButton,
  },
  data: () => ({
    fee: MIN_SPEND_TX_FEE,
    MAGNITUDE,
    MIN_SPEND_TX_FEE,
    MAX_REASONABLE_FEE,
  }),
  methods: {
    async setTransactionFee() {
      await this.$validator.validateAll();
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
