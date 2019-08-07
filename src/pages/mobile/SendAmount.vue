<template>
  <MobilePage
    :left-button-to="{ name: 'send' }"
    :right-button-to="{ name: 'transfer' }"
    left-button-icon-name="back"
    right-button-icon-name="close"
    :header-fill="activeColor"
  >
    <template slot="header">
      <Guide
        :template="$t('transfer.send.amount.guide')"
        fill="neutral"
      >
        <AeFraction
          slot="icon"
          numerator="2"
          denominator="3"
        />
        <AccountInline
          slot="senderAddress"
          :address="activeAccount.address"
        />
        <AccountInline
          slot="recipientAddress"
          :address="to"
        />
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
            max_value: max,
          }"
          :max="max"
          :error="errors.has('amount')"
          :footer="errors.first('amount')"
          autofocus
          name="amount"
        />
      </form>
    </template>

    <DetailsAmount
      :name="$t('transfer.send.amount.fee')"
      :amount="minFee"
    />

    <DetailsAmountCurrency
      :name="$t('transfer.send.amount.balance')"
      :amount="activeAccount.balance"
    />

    <AeButton
      :disabled="errors.any()"
      :form="_uid"
      fill="secondary"
    >
      {{ $t('next') }}
    </AeButton>
  </MobilePage>
</template>

<script>
import { pick } from 'lodash-es';
import { mapGetters, mapState } from 'vuex';
import BigNumber from 'bignumber.js';
import { TxBuilder } from '@aeternity/aepp-sdk/es';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AccountInline from '../../components/AccountInline.vue';
import AeInputAmountAe from '../../components/AeInputAmountAe.vue';
import DetailsAmount from '../../components/mobile/DetailsAmount.vue';
import DetailsAmountCurrency from '../../components/mobile/DetailsAmountCurrency.vue';
import AeButton from '../../components/AeButton.vue';
import { MAGNITUDE } from '../../lib/constants';
import toCurrency from '../../filters/toCurrency';
import toAe from '../../filters/toAe';

export default {
  components: {
    MobilePage,
    Guide,
    AeFraction,
    AccountInline,
    AeInputAmountAe,
    DetailsAmount,
    DetailsAmountCurrency,
    AeButton,
  },
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    customAmount: '',
    maxSelected: false,
    minFee: BigNumber(0),
    MAGNITUDE,
  }),
  computed: {
    ...mapGetters('accounts', ['activeColor']),
    ...mapState('currencies', ['swapped']),
    max() {
      const max = this.activeAccount.balance.minus(this.minFee);
      const convertedMax = this.swapped ? toCurrency(max, this.rate) : max;
      return (convertedMax.isPositive() ? convertedMax : 0).toString();
    },
    amount: {
      get() {
        return this.maxSelected ? this.max : this.customAmount;
      },
      set(value) {
        if (value === this.max) this.maxSelected = true;
        else {
          this.customAmount = value;
          this.maxSelected = false;
        }
      },
    },
  },
  subscriptions() {
    return pick(this.$store.state.observables, ['activeAccount', 'rate']);
  },
  mounted() {
    this.$watch(
      ({ activeAccount: { address, nonce }, amount }) => ({ address, nonce, amount }),
      ({ address, nonce, amount }) => {
        const minFee = BigNumber(TxBuilder.calculateMinFee(
          'spendTx', {
            gas: this.$store.state.sdk.Ae.defaults.gas,
            params: {
              ...this.$store.state.sdk.Ae.defaults,
              senderId: address,
              recipientId: address,
              amount: BigNumber(amount > 0 ? amount : 0).shiftedBy(MAGNITUDE),
              ttl: 0,
              nonce: nonce + 1,
              payload: '',
            },
          },
        )).shiftedBy(-MAGNITUDE);
        if (!minFee.isEqualTo(this.minFee)) this.minFee = minFee;
      },
      { immediate: true },
    );
  },
  methods: {
    async setAmount() {
      if (!await this.$validator.validateAll()) return;
      const convertedAmount = this.swapped ? toAe(BigNumber(this.amount), this.rate) : this.amount;
      this.$router.push({ name: 'send-confirm', params: { to: this.to, amount: `${convertedAmount}` } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables/colors.scss';

.mobile-page .details-item {
  --color-primary: #{$color-neutral-negative-1};
  --color-secondary: #{$color-neutral-negative-1};

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
}
</style>
