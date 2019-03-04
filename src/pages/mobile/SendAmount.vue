<template>
  <MobilePage
    :left-button-to="{ name: 'send' }"
    :right-button-to="{ name: 'transfer' }"
    left-button-icon-name="back"
    right-button-icon-name="close"
    header-fill="primary"
  >
    <template slot="header">
      <Guide fill="neutral">
        <AeFraction
          slot="icon"
          numerator="2"
          denominator="3"
        />
        <em>New Transfer</em>
        <p>
          from
          <AeIdenticon
            :address="activeIdentity.address"
            size="s"
          />
          {{ ' ' }}
          <em>{{ activeIdentity.name }}</em>
          to
          <AeIdenticon
            :address="to"
            size="s"
          />
          {{ ' ' }}
          <em>
            <AeAddress
              :address="to"
              length="short"
            />
          </em>
        </p>
      </Guide>

      <form
        :id="_uid"
        @submit.prevent="setAmount"
      >
        <AeInputAmountAe
          v-model="amount"
          v-validate="{
            required: true,
            decimal: MAGNITUDE,
            min_value_exclusive: 0,
            max_value: maxAmount.minus(MIN_SPEND_TX_FEE).toString(),
          }"
          :error="errors.has('amount')"
          :footer="errors.first('amount')"
          autofocus
          name="amount"
        />
      </form>
    </template>

    <AeButton
      :disabled="errors.any()"
      :form="_uid"
      fill="secondary"
    >
      Next
    </AeButton>
  </MobilePage>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapGetters, mapState } from 'vuex';
import { AeIdenticon } from '@aeternity/aepp-components-3';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AeInputAmountAe from '../../components/AeInputAmountAe.vue';
import AeButton from '../../components/AeButton.vue';
import AeAddress from '../../components/AeAddress.vue';
import { MAGNITUDE, MIN_SPEND_TX_FEE } from '../../lib/constants';

export default {
  components: {
    MobilePage,
    Guide,
    AeFraction,
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
    MIN_SPEND_TX_FEE,
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
