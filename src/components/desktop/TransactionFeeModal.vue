<template>
  <ledger-modal
    title="Define the Transaction fee"
    class="transaction-fee"
  >
    <ae-input
      v-model="fee"
      v-validate="{
        required: true,
        decimal: MAGNITUDE,
        min_value: MIN_SPEND_TX_FEE,
        max_value: MAX_REASONABLE_FEE,
      }"
      :error="errors.has('fee')"
      type="number"
      name="amount"
      label="Transaction Fee"
      placeholder="0.0"
      aemount
    >
      <span slot="header">
        Pico AE
      </span>
    </ae-input>

    <range
      v-model="fee"
      :min="MIN_SPEND_TX_FEE"
      :max="MAX_REASONABLE_FEE"
    />

    <div class="note">
      A higher transaction fee leads to a faster
      <br>transaction time.
    </div>

    <button-plain
      slot="footer"
      @click="next"
    >
      Next
    </button-plain>
  </ledger-modal>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapState } from 'vuex';
import LedgerModal from './LedgerModal.vue';
import AeInput from '../AeInput.vue';
import Range from '../Range.vue';
import ButtonPlain from '../ButtonPlain.vue';
import { MAGNITUDE, MIN_SPEND_TX_FEE, MAX_REASONABLE_FEE } from '../../lib/constants';

export default {
  components: {
    LedgerModal,
    AeInput,
    Range,
    ButtonPlain,
  },
  data: () => ({
    fee: MIN_SPEND_TX_FEE,
    MAGNITUDE,
    MIN_SPEND_TX_FEE,
    MAX_REASONABLE_FEE,
    BigNumber,
  }),
  computed: mapState({
    address: ({ desktop: { showSignTransactionModalForAddress } }) => (
      showSignTransactionModalForAddress),
    formattedFee() {
      return BigNumber(this.fee).shiftedBy(-MAGNITUDE);
    },
  }),
  methods: {
    async next() {
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

  .ae-input-container {
    margin: rem(60px) auto;
    width: rem(311px);
    height: rem(96px);
    color: red;

    /deep/ {
      .ae-input-header span {
        margin-right: rem(30px);
        @extend %face-sans-xs;
        color: $color-neutral-negative-3
      }

      .ae-input.aemount {
        margin: 0;
      }
    }
  }

  .range {
    display: block;
    margin: rem(40px) auto;
    width: rem(279px);
  }

  .note {
    @extend %face-sans-s;
    color: $color-neutral-negative-3;
    text-align: center;
  }

  .button-plain {
    float: right;
    @extend %face-sans-xs;
    color: $color-neutral-minimum;
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>
