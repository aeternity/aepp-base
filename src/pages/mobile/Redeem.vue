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
    class="redeem"
  >
    <template slot="header">
      <Guide
        :template="$t('transfer.redeem-balance.guide')"
      />
    </template>

    <DetailsAmountCurrency
      :name="$t('transfer.send.amount.balance')"
      :amount="balance"
    />

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
import { Universal, MemoryAccount } from '@aeternity/aepp-sdk/es';
import {
  generateKeyPairFromSecret,
  hexStringToByte,
  aeEncodeKey,
} from '@aeternity/aepp-sdk/es/utils/crypto';
import { handleUnknownError } from '../../lib/utils';
import AeLoader from '../../components/AeLoader.vue';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import DetailsAmountCurrency from '../../components/mobile/DetailsAmountCurrency.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import { LeftMore } from '../../components/icons';
import { MIN_SPEND_TX_FEE, MAGNITUDE } from '../../lib/constants';

export default {
  components: {
    AeLoader,
    MobilePage,
    Guide,
    DetailsAmountCurrency,
    ListItemAccount,
    LeftMore,
  },
  data() {
    return {
      balance: 0,
      busy: true,
      client: {},
    };
  },
  subscriptions() {
    return pick(this.$store.state.observables, ['accounts']);
  },
  async mounted() {
    try {
      const privateKey = await this.$store.dispatch('modals/open', {
        name: 'readQrCode',
        title: this.$t('transfer.redeem-balance.scan'),
      });
      const keypair = generateKeyPairFromSecret(hexStringToByte(privateKey));
      const address = aeEncodeKey(keypair.publicKey);
      this.balance = BigNumber(await this.$store.state.sdk.getBalance(address))
        .shiftedBy(-MAGNITUDE);
      if (this.balance < MIN_SPEND_TX_FEE) throw new Error(this.$t('transfer.redeem-balance.no-funds'));
      this.client = await Universal({
        url: this.$store.state.sdkUrl,
        compilerUrl: 'https://compiler.aepps.com',
        accounts: [MemoryAccount({
          keypair: {
            secretKey: privateKey,
            publicKey: address,
          },
        })],
        address,
      });
    } catch (e) {
      let alertMessage;
      if (['Invalid Key Pair', 'bad secret key size'].includes(e.message)) {
        alertMessage = this.$t('transfer.redeem-balance.wrong-qr-code');
      } else if (e.message === this.$t('transfer.redeem-balance.no-funds')) {
        alertMessage = e.message;

        if (alertMessage) {
          await this.$store.dispatch('modals/open', {
            name: 'alert',
            text: alertMessage,
          });
        } else {
          handleUnknownError(e);
        }
      }
      this.$router.push({ name: 'transfer' });
    } finally {
      this.busy = false;
    }
  },
  methods: {
    async sendToAccount(accountTo) {
      if (!await this.$validator.validateAll()) return;
      this.busy = true;
      const { hash, tx: { amount } } = await this.client.transferFunds(1, accountTo);
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
@import '../../styles/variables/colors.scss';

.loader {
  flex-grow: 1;
  display: flex;

  .ae-loader {
    margin: auto;
  }
}
.redeem .details-item {
  --color-primary: #{$color-neutral-negative-1};
  --color-secondary: #{$color-neutral-negative-1};
  border-top: none;
  padding-top: 0;
}
</style>
