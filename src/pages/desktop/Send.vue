<template>
  <div class="send">
    <Guide
      :template="$t('transfer.send.guide')"
      size="big"
    >
      <AccountInline
        slot="senderAddress"
        :address="activeAccount.address"
      />
    </Guide>

    <Note>
      {{ $t('transfer.send.note') }}
    </Note>

    <form @submit.prevent="send">
      <AeInputAddress
        v-model="accountTo"
        v-validate="'required|address'"
        :error="errors.has('accountTo')"
        :footer="errors.first('accountTo')"
        autofocus
        name="accountTo"
        :header="$t('transfer.send.to.recipient')"
      />

      <AeInputAmountAe
        v-model="amount"
        v-validate="{
          required: true,
          decimal: MAGNITUDE,
          min_value_exclusive: 0,
          max_value: activeAccount.balance.minus(MIN_SPEND_TX_FEE).toString(),
        }"
        :error="errors.has('amount')"
        :footer="errors.first('amount')"
        name="amount"
      />

      <AeButton :disabled="errors.any() || busy">
        {{ $t('transfer.send.transfer') }}
      </AeButton>
    </form>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
import { pick } from 'lodash-es';
import Guide from '../../components/Guide.vue';
import AccountInline from '../../components/AccountInline.vue';
import Note from '../../components/Note.vue';
import AeInputAddress from '../../components/AeInputAddress.vue';
import AeInputAmountAe from '../../components/AeInputAmountAe.vue';
import AeButton from '../../components/AeButton.vue';
import { MAGNITUDE, MIN_SPEND_TX_FEE } from '../../lib/constants';

export default {
  components: {
    Guide,
    AccountInline,
    Note,
    AeInputAddress,
    AeInputAmountAe,
    AeButton,
  },
  data: () => ({
    accountTo: '',
    amount: '',
    MAGNITUDE,
    MIN_SPEND_TX_FEE,
    busy: false,
  }),
  subscriptions() {
    return pick(this.$store.state.observables, ['activeAccount']);
  },
  methods: {
    async send() {
      if (!await this.$validator.validateAll()) return;

      const amount = BigNumber(this.amount);
      this.busy = true;
      try {
        const { hash } = await this.$store.state.sdk.spend(
          amount.shiftedBy(MAGNITUDE),
          this.accountTo,
        );

        await this.$store.dispatch('modals/open', { name: 'spendSuccess', transactionHash: hash, amount });
        this.accountTo = '';
        this.amount = '';
        this.$validator.reset();
      } finally {
        this.busy = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.send {
  .ae-input-wrapper {
    margin-bottom: rem(42px);
    background: #fff;
    box-shadow: 0 0 rem(8px) rgba(27, 68, 121, 0.1);
  }

  .ae-button {
    display: block;
    margin-top: rem(53px);
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
