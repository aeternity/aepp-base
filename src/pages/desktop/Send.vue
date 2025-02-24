<template>
  <div class="send">
    <Guide :template="$t('transfer.send.guide')" size="big">
      <AccountInline slot="senderAddress" :address="activeAccount.address" />
    </Guide>

    <Note>
      {{ $t('transfer.send.note') }}
    </Note>

    <form @submit.prevent="send">
      <AeInputAccount
        v-model="accountTo"
        v-validate="'required|account'"
        :error="errors.has('accountTo')"
        :footer="errors.first('accountTo')"
        autofocus
        name="accountTo"
        :header="$t('transfer.send.to.recipient')"
      />

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
        :footer="errors.first('amount') && errors.first('amount').toString()"
        name="amount"
      />

      <DetailsAmount :name="$t('transfer.send.amount.fee')" :amount="minFee" />

      <DetailsAmountCurrency
        :name="$t('transfer.send.amount.balance')"
        :amount="activeAccount.balance"
      />

      <AeButton :disabled="errors.any() || busy" :spinner="busy">
        {{ $t('transfer.send.transfer') }}
      </AeButton>
    </form>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
import { pick } from 'lodash-es';
import { mapState } from 'vuex';
import SendAmountMixin from '../SendAmountMixin';
import Guide from '../../components/Guide.vue';
import AccountInline from '../../components/AccountInline.vue';
import Note from '../../components/Note.vue';
import AeInputAccount from '../../components/AeInputAccount.vue';
import AeInputAmountCurrency from '../../components/AeInputAmountCurrency.vue';
import DetailsAmount from '../../components/mobile/DetailsAmount.vue';
import DetailsAmountCurrency from '../../components/mobile/DetailsAmountCurrency.vue';
import AeButton from '../../components/AeButton.vue';
import { MAGNITUDE } from '../../lib/constants';

export default {
  components: {
    Guide,
    AccountInline,
    Note,
    AeInputAccount,
    AeInputAmountCurrency,
    DetailsAmount,
    DetailsAmountCurrency,
    AeButton,
  },
  mixins: [SendAmountMixin],
  data: () => ({
    accountTo: '',
    MAGNITUDE,
    busy: false,
  }),
  subscriptions() {
    return pick(this.$store.state.observables, ['activeAccount']);
  },
  computed: mapState('names', {
    accountToAddress(state, { getAddress }) {
      return getAddress(this.accountTo);
    },
  }),
  methods: {
    async send() {
      if (!(await this.$validator.validateAll())) return;
      if (this.activeAccount.address === this.accountToAddress) {
        await this.$store.dispatch('modals/open', {
          name: 'confirm',
          text: this.$t('transfer.send.to.confirm-sending-to-same-account'),
        });
      }

      const amount = BigNumber(this.amount);
      this.busy = true;
      try {
        const { hash } = await this.$store.getters.sdk.spend(
          amount.shiftedBy(MAGNITUDE),
          this.accountTo,
        );

        await this.$store.dispatch('modals/open', {
          name: 'spendSuccess',
          transactionHash: hash,
          amount,
        });
        this.accountTo = '';
        this.amount = '';
        this.$validator.reset();
      } catch (error) {
        if (['Rejected by user', 'Cancelled by user'].includes(error.message)) return;
        throw error;
      } finally {
        this.busy = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';

.send {
  .ae-input-wrapper {
    margin-bottom: functions.rem(42px);
    background: #fff;
    box-shadow: 0 0 functions.rem(8px) rgba(27, 68, 121, 0.1);
  }

  .ae-input-wrapper + .details-item {
    border-top: none;
    padding-top: 0;
  }

  .details-item {
    --color-primary: #{variables.$color-neutral-negative-1};
    --color-secondary: #{variables.$color-neutral-negative-1};
  }

  .ae-button {
    display: block;
    margin-top: functions.rem(53px);
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
