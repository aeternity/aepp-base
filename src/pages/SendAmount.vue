<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'send' }"
    class="send-amount"
    fill="primary"
    close-button
  >
    <guide
      fill="neutral"
      icon="⅔"
    >
      <em>New Transfer</em>
      <br>from
      <ae-identicon
        :address="activeIdentity.address"
        size="s"
      /><em>{{ activeIdentity.name }}</em>
      <br>to
      <ae-identicon
        :address="to"
        size="s"
      />
      <em>
        <span class="address">
          {{ formattedAddress }}
        </span>
      </em>
    </guide>

    <ae-input
      :id="_uid.toString()"
      v-model="amount"
      v-validate="{
        required: true,
        decimal: MAGNITUDE,
        min_value: MIN_SPEND_TX_FEE.toString(),
        max_value: maxAmount.minus(fee).toString(),
      }"
      :error="!!errors.first('amount')"
      type="number"
      name="amount"
      label="Amount"
      placeholder="0.0"
      aemount
    >
      <span slot="header">
        AE
      </span>
      <ae-toolbar slot="footer">
        <span> Minimum transaction fee</span>
        <span>{{ MIN_SPEND_TX_FEE | prefixedAmount }} AE</span>
      </ae-toolbar>
    </ae-input>

    <ae-button
      slot="content-bottom"
      :disabled="errors.any()"
      size="medium"
      fill="secondary"
      uppercase
      @click="setAmount"
    >
      Next
    </ae-button>
  </mobile-page>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapGetters, mapState } from 'vuex';
import { AeIdenticon, AeToolbar } from '@aeternity/aepp-components-3';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeInput from '../components/AeInput.vue';
import AeButton from '../components/AeButton.vue';
import { MAGNITUDE, MIN_SPEND_TX_FEE } from '../lib/constants';
import prefixedAmount from '../filters/prefixedAmount';

export default {
  components: {
    MobilePage,
    Guide,
    AeIdenticon,
    AeInput,
    AeToolbar,
    AeButton,
  },
  filters: { prefixedAmount },
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    amount: '',
    MAGNITUDE,
    MIN_SPEND_TX_FEE: BigNumber(MIN_SPEND_TX_FEE).shiftedBy(-MAGNITUDE),
    fee: BigNumber(MIN_SPEND_TX_FEE).shiftedBy(-MAGNITUDE).toFixed(),
    BigNumber,
  }),
  computed: {
    ...mapGetters(['activeIdentity', 'identities']),
    ...mapState({
      maxAmount: ({ balances }, { activeIdentity }) => (
        activeIdentity ? balances[activeIdentity.address] : BigNumber(0)),
    }),
    formattedAddress() {
      const address = this.to;
      return `${address.substr(0, 3)} ${address.substr(3, 2)}···${address.slice(-3)}`;
    },
  },
  methods: {
    async setAmount() {
      if (!await this.$validator.validateAll()) return;
      this.$router.push({ name: 'send-confirm', params: { to: this.to, amount: this.amount } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.send-amount {
  /deep/ {
    .ae-input-container .ae-input-box {
      .ae-input-header span {
        margin-right: rem(30px);
        @extend %face-sans-xs;
        color: $color-neutral-negative-3
      }

      .ae-input.aemount {
        margin: 0;
      }
    }

    .panel .bottom {
      margin-top: rem(-32px);
    }
  }

  .ae-toolbar {
    justify-content: space-between;
  }

  .ae-button {
    margin: rem(60px) auto rem(30px) auto;
  }

  .guide {
    margin: 0 0 rem(30px) rem(30px);

    .ae-identicon {
      margin: 0 rem(2px) rem(-4px) rem(2px);
    }

    .address {
      @extend %face-mono-base;
      font-size: rem(23px);
    }
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
