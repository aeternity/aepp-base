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
        <ae-address
          :address="to"
          length="short"
        />
      </em>
    </guide>

    <ae-input-amount-ae
      v-model="amount"
      v-validate="{
        required: true,
        decimal: MAGNITUDE,
        min_value: 0,
        max_value: maxAmount.minus(MIN_SPEND_TX_FEE).toString(),
      }"
      :error="errors.has('amount')"
      :footer="errors.first('amount')"
      name="amount"
    />

    <ae-button
      slot="content-bottom"
      :disabled="errors.any()"
      fill="secondary"
      @click="setAmount"
    >
      Next
    </ae-button>
  </mobile-page>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapGetters, mapState } from 'vuex';
import { AeIdenticon } from '@aeternity/aepp-components-3';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeInputAmountAe from '../components/AeInputAmountAe.vue';
import AeButton from '../components/AeButton.vue';
import AeAddress from '../components/AeAddress.vue';
import { MAGNITUDE, MIN_SPEND_TX_FEE } from '../lib/constants';

export default {
  components: {
    MobilePage,
    Guide,
    AeIdenticon,
    AeInputAmountAe,
    AeButton,
    AeAddress,
  },
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
    BigNumber,
  }),
  computed: {
    ...mapGetters(['activeIdentity', 'identities']),
    ...mapState({
      maxAmount: ({ balances }, { activeIdentity }) => (
        activeIdentity ? balances[activeIdentity.address] : BigNumber(0)),
    }),
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
    .panel .bottom {
      margin-top: rem(-32px);
    }
  }

  .ae-button {
    margin: rem(60px) auto rem(30px) auto;
  }

  .guide {
    margin: 0 0 rem(30px) rem(30px);

    .ae-identicon {
      margin: 0 rem(6px) rem(-4px) rem(2px);
    }

    .ae-address {
      font-size: rem(23px);
    }
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
