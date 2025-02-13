<template>
  <div v-if="busy" class="spinner">
    <AeSpinner />
  </div>
  <Page
    v-else
    header-fill="neutral"
    :right-button-to="{ name: 'transfer' }"
    right-button-icon-name="close"
    class="redeem-balance"
  >
    <Guide slot="header" :template="$t('transfer.redeem-balance.guide')" />

    <div class="balance-row">
      <span>{{ $t('transfer.send.amount.balance') }}</span>
      <Balance :balance="balance" />
    </div>

    <ListItemAccount
      v-for="account in accounts"
      :key="account.address"
      border-dark
      v-bind="account"
      @click="sendToAccount(account.address)"
    >
      <LeftMore slot="right" />
    </ListItemAccount>
  </Page>
</template>

<script>
import { pick } from 'lodash-es';
import BigNumber from 'bignumber.js';
import { encode, Encoding, MemoryAccount, transferFunds } from '@aeternity/aepp-sdk-next';
import { handleUnknownError } from '../../lib/utils';
import AeSpinner from '../../components/AeSpinner.vue';
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import Balance from '../../components/Balance.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import { LeftMore } from '../../components/icons';
import { MAGNITUDE } from '../../lib/constants';
import { MIN_SPEND_TX_FEE } from '../../lib/spendTxFees';

export default {
  components: {
    AeSpinner,
    Page,
    Guide,
    Balance,
    ListItemAccount,
    LeftMore,
  },
  data: () => ({
    inviteAccount: null,
    balance: 0,
    busy: true,
  }),
  subscriptions() {
    return pick(this.$store.state.observables, ['accounts']);
  },
  async mounted() {
    while (!this.inviteAccount) {
      try {
        await this.readQrCode();
      } catch (error) {
        this.$router.push({ name: 'transfer' });
        if (error.message !== 'Cancelled by user') handleUnknownError(error);
        return;
      }
    }
    this.busy = false;
  },
  methods: {
    async readQrCode() {
      let privateKey;
      privateKey = await this.$store.dispatch('modals/open', {
        name: 'readQrCode',
        title: this.$t('transfer.redeem-balance.scan'),
      });

      try {
        privateKey = Buffer.from(privateKey, 'hex');
      } catch (error) {
        handleUnknownError(error);
        privateKey = Buffer.from([]);
      }

      if (privateKey.length !== 64) {
        await this.$store.dispatch('modals/open', {
          name: 'alert',
          text: this.$t('transfer.redeem-balance.wrong-qr-code'),
        });
        return;
      }

      const account = new MemoryAccount(
        encode(privateKey.subarray(0, 32), Encoding.AccountSecretKey),
      );
      const { sdk } = this.$store.getters;
      this.balance = BigNumber(await sdk.getBalance(account.address)).shiftedBy(-MAGNITUDE);
      if (this.balance < MIN_SPEND_TX_FEE) {
        await this.$store.dispatch('modals/open', {
          name: 'alert',
          text: this.$t('transfer.redeem-balance.no-funds'),
        });
        return;
      }

      this.inviteAccount = account;
    },
    async sendToAccount(accountTo) {
      this.busy = true;
      const {
        hash,
        tx: { amount },
      } = await transferFunds(1, accountTo, {
        onAccount: this.inviteAccount,
        onNode: this.$store.getters.node,
      });
      this.$router.push({ name: 'transfer' });
      this.$store.dispatch('modals/open', {
        name: 'spendSuccess',
        transactionHash: hash,
        amount: BigNumber(amount).shiftedBy(-MAGNITUDE),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/typography';

.spinner {
  flex-grow: 1;
  display: flex;

  .ae-spinner {
    margin: auto;
  }
}

.redeem-balance .balance-row {
  display: flex;
  justify-content: space-between;
  @extend %face-sans-base;
}
</style>
