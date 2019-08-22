<template>
  <MobilePage
    :left-button-to="{ name: 'send' }"
    :right-button-to="{ name: 'transfer' }"
    left-button-icon-name="back"
    right-button-icon-name="close"
    class="send-amount"
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
        <AeInputAmountCurrency
          v-model="amount"
          v-validate="{
            required: true,
            decimal: MAGNITUDE,
            min_value_exclusive: 0,
            max_value_currency: max,
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
import { mapGetters } from 'vuex';
import SendAmountMixin from '../SendAmountMixin';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AccountInline from '../../components/AccountInline.vue';
import AeInputAmountCurrency from '../../components/AeInputAmountCurrency.vue';
import DetailsAmount from '../../components/mobile/DetailsAmount.vue';
import DetailsAmountCurrency from '../../components/mobile/DetailsAmountCurrency.vue';
import AeButton from '../../components/AeButton.vue';
import { MAGNITUDE } from '../../lib/constants';

export default {
  components: {
    MobilePage,
    Guide,
    AeFraction,
    AccountInline,
    AeInputAmountCurrency,
    DetailsAmount,
    DetailsAmountCurrency,
    AeButton,
  },
  mixins: [SendAmountMixin],
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    MAGNITUDE,
  }),
  computed: mapGetters('accounts', ['activeColor']),
  subscriptions() {
    return pick(this.$store.state.observables, ['activeAccount']);
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
@import '../../styles/variables/colors.scss';

.send-amount .details-item {
  --color-primary: #{$color-neutral-negative-1};
  --color-secondary: #{$color-neutral-negative-1};

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
}
</style>
