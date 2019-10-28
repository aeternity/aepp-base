<template>
  <div
    v-if="busy"
    class="loader"
  >
    <AeLoader />
  </div>
  <MobilePage
    v-else
    header-fill="neutral"
    :right-button-to="{ name: 'transfer' }"
    right-button-icon-name="close"
    class="redeem-balance"
  >
    <Guide
      slot="header"
      :template="$t('transfer.redeem-balance.guide')"
    />

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
  </MobilePage>
</template>

<script>
import { pick } from 'lodash-es';
import BigNumber from 'bignumber.js';
import { Ae, Transaction, Crypto } from '@aeternity/aepp-sdk/es';
import { handleUnknownError } from '../../lib/utils';
import AeLoader from '../../components/AeLoader.vue';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import Balance from '../../components/Balance.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import { LeftMore } from '../../components/icons';
import { MIN_SPEND_TX_FEE, MAGNITUDE } from '../../lib/constants';

export default {
  components: {
    AeLoader,
    MobilePage,
    Guide,
    Balance,
    ListItemAccount,
    LeftMore,
  },
  data: () => ({
    keypair: null,
    balance: 0,
    busy: true,
  }),
  subscriptions() {
    return pick(this.$store.state.observables, ['accounts']);
  },
  async mounted() {
    while (!this.keypair) {
      try {
        await this.readQrCode(); // eslint-disable-line no-await-in-loop
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

      const address = Crypto.aeEncodeKey(Crypto.generateKeyPairFromSecret(privateKey).publicKey);
      this.balance = BigNumber(await this.$store.state.sdk.getBalance(address))
        .shiftedBy(-MAGNITUDE);
      if (this.balance < MIN_SPEND_TX_FEE) {
        await this.$store.dispatch('modals/open', {
          name: 'alert',
          text: this.$t('transfer.redeem-balance.no-funds'),
        });
        return;
      }

      this.keypair = { address, privateKey };
    },
    async sendToAccount(accountTo) {
      this.busy = true;
      const { hash, tx: { amount } } = await (
        await Ae.compose(
          Transaction, {
            methods: {
              sign: data => Promise.resolve(Crypto.sign(data, this.keypair.privateKey)),
              address: () => Promise.resolve(this.keypair.address),
            },
          },
        )({ url: this.$store.state.sdkUrl })
      )
        .transferFunds(1, accountTo);
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
@import '../../styles/typography';

.loader {
  flex-grow: 1;
  display: flex;

  .ae-loader {
    margin: auto;
  }
}

.redeem-balance .balance-row {
  display: flex;
  justify-content: space-between;
  @extend %face-sans-base;
}
</style>
