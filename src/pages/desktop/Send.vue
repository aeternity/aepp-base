<template>
  <div class="send">
    <Guide size="big">
      <em>Send</em> AE from<br>
      <AccountInline :address="activeAccount.address" />
    </Guide>

    <Note>
      Paste the recipient address below. Or send to subaccounts, contacts or scan QR code.
    </Note>

    <form @submit.prevent="send">
      <AeInputAddress
        v-model="accountTo"
        v-validate="'required|address'"
        :error="errors.has('accountTo')"
        :footer="errors.first('accountTo')"
        autofocus
        name="accountTo"
        header="To"
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

      <AeButton :disabled="errors.any()">
        Transfer
      </AeButton>
    </form>

    <TransferNotification
      v-if="transferNotification"
      v-bind="transferNotification"
    />
  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
import Guide from '../../components/Guide.vue';
import AccountInline from '../../components/AccountInline.vue';
import Note from '../../components/Note.vue';
import AeInputAddress from '../../components/AeInputAddress.vue';
import AeInputAmountAe from '../../components/AeInputAmountAe.vue';
import AeButton from '../../components/AeButton.vue';
import TransferNotification from '../../components/TransferNotification.vue';
import { MAGNITUDE, MIN_SPEND_TX_FEE } from '../../lib/constants';
import { activeAccount } from '../../observables';

export default {
  components: {
    Guide,
    AccountInline,
    Note,
    AeInputAddress,
    AeInputAmountAe,
    AeButton,
    TransferNotification,
  },
  data: () => ({
    accountTo: '',
    amount: '',
    MAGNITUDE,
    MIN_SPEND_TX_FEE,
    transferNotification: null,
  }),
  subscriptions: () => ({ activeAccount }),
  methods: {
    async send() {
      if (!await this.$validator.validateAll()) return;

      const amount = BigNumber(this.amount);
      const { hash } = await this.$store.state.sdk.spend(
        amount.shiftedBy(MAGNITUDE),
        this.accountTo,
      );

      this.transferNotification = { transactionHash: hash, amount };
      setTimeout(() => { this.transferNotification = null; }, 5000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

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

  .transfer-notification {
    left: auto;
    right: auto;
    width: rem(520px);
  }
}
</style>
