<template>
  <MobilePage
    v-if="transaction"
    :header-fill="transaction.received ? 'alternative' : 'primary'"
    class="transaction-details"
    title="Transaction details"
    left-button-icon-name="back"
    @left-button-click="$router.push({ name: 'transaction-list' })"
  >
    <template slot="header">
      <Guide fill="neutral">
        {{ transaction.received ? 'You received' : 'You sent' }}
        <Balance
          :balance="transaction.tx.amount"
          invert
        />
        <template v-if="transaction.tx.senderId">
          <br>from
          <AccountInline :address="transaction.tx.senderId" />
        </template>
        <template v-if="transaction.tx.recipientId">
          <br>to
          <AccountInline :address="transaction.tx.recipientId" />
        </template>
      </Guide>
    </template>

    <DetailsField
      name="Date"
      :value="transaction.time.toLocaleString()"
    />

    <DetailsField
      :class="{ pending: transaction.pending }"
      class="status"
      name="Status"
      :value="status"
    />

    <Component
      :is="transaction.received ? 'DetailsAmount' : 'DetailsAmountAndFee'"
      :amount="transaction.tx.amount"
      :fee="transaction.tx.fee"
    />

    <DetailsAddress
      v-if="transaction.tx.senderId"
      name="From"
      :address="transaction.tx.senderId"
    />

    <DetailsAddress
      v-if="transaction.tx.recipientId"
      name="To"
      :address="transaction.tx.recipientId"
    />

    <DetailsAddress
      v-if="transaction.tx.ownerId"
      name="Owner"
      :address="transaction.tx.ownerId"
    />

    <DetailsAddress
      name="Tx hash"
      :address="transaction.hash"
    />

    <AeButton
      slot="footer"
      :fill="transaction.received ? 'alternative' : 'primary'"
      :to="`${currentNetwork.explorerUrl}/#/tx/${hash}`"
    >
      View in explorer
    </AeButton>
  </MobilePage>
</template>

<script>
import { mapGetters } from 'vuex';
import { pluck } from 'rxjs/operators';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import Balance from '../../components/Balance.vue';
import AccountInline from '../../components/AccountInline.vue';
import DetailsField from '../../components/mobile/DetailsField.vue';
import DetailsAmountAndFee from '../../components/mobile/DetailsAmountAndFee.vue';
import DetailsAmount from '../../components/mobile/DetailsAmount.vue';
import DetailsAddress from '../../components/mobile/DetailsAddress.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    Guide,
    Balance,
    AccountInline,
    DetailsField,
    DetailsAmountAndFee,
    DetailsAmount,
    DetailsAddress,
    AeButton,
  },
  props: {
    hash: { type: String, required: true },
  },
  computed: {
    ...mapGetters({ activeAccount: 'accounts/active', currentNetwork: 'currentNetwork' }),
    status() {
      return this.transaction.pending
        ? 'Pending'
        : `${this.transaction.confirmationCount} Confirmations`;
    },
  },
  subscriptions() {
    return {
      transaction: this.$store.state.observables.getTransaction(
        this.$watchAsObservable(({ hash }) => hash, { immediate: true }).pipe(pluck('newValue')),
      ),
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.transaction-details {
  /deep/ main {
    margin-top: 0;
    padding-top: 0;
  }

  .guide .balance {
    &, &:after {
      font-size: rem(23px);
    }
  }

  .details-item {
    &:first-child {
      border-top: none;
    }

    &.status {
      --color-primary: #{$color-alternative};

      &.pending {
        --color-primary: #{$color-primary};
      }

      /deep/ .value {
        text-transform: uppercase;
      }
    }

    --color-primary: #{$color-neutral-negative-3};
    --color-secondary: #{$color-neutral-negative-1};
  }
}
</style>
