<template>
  <MobilePage
    v-if="transaction"
    :header-fill="transaction.received ? 'alternative' : 'primary'"
    class="transaction-details"
    :title="$t('transfer.transaction.details.title')"
    left-button-icon-name="back"
    @left-button-click="$router.push({ name: 'transaction-list' })"
  >
    <template slot="header">
      <Guide fill="neutral">
        <template v-if="transaction.tx.amount">
          {{ transaction.received
            ? $t('transfer.transaction.details.received')
            : $t('transfer.transaction.details.sent') }}
          <em class="balance">{{ transaction.tx.amount | prefixedAmount }} AE</em>
        </template>
        <template v-if="transaction.tx.senderId">
          <br>{{ $t('transfer.transaction.details.from').toLowerCase() }}
          <AccountInline :address="transaction.tx.senderId" />
        </template>
        <template v-if="transaction.tx.recipientId">
          <br>{{ $t('transfer.transaction.details.to').toLowerCase() }}
          <AccountInline :address="transaction.tx.recipientId" />
        </template>
      </Guide>
    </template>

    <DetailsField
      v-if="!transaction.pending"
      :name="$t('transfer.transaction.details.date')"
      :value="transaction.time.toLocaleString()"
    />

    <DetailsField
      :class="{ pending: transaction.pending }"
      class="status"
      :name="$t('transfer.transaction.details.status')"
      :value="status"
    />

    <DetailsAmount
      v-if="transaction.received || !transaction.tx.amount"
      :amount="transaction.tx.amount || transaction.tx.fee"
      :name="transaction.tx.amount ? 'Amount' : 'Fee'"
    />
    <DetailsAmountAndFee
      v-else
      :amount="transaction.tx.amount"
      :fee="transaction.tx.fee"
    />

    <DetailsAddress
      v-if="transaction.tx.senderId"
      :name="$t('transfer.transaction.details.from')"
      :address="transaction.tx.senderId"
    />

    <DetailsAddress
      v-if="transaction.tx.recipientId"
      :name="$t('transfer.transaction.details.to')"
      :address="transaction.tx.recipientId"
    />

    <DetailsAddress
      v-if="transaction.tx.ownerId"
      :name="$t('transfer.transaction.details.owner')"
      :address="transaction.tx.ownerId"
    />

    <DetailsAddress
      :name="$t('transfer.transaction.details.hash')"
      :address="transaction.hash"
    />

    <DetailsField
      name="Transaction type"
      :value="transaction.type"
    />

    <AeButton
      slot="footer"
      :fill="transaction.received ? 'alternative' : 'primary'"
      :to="`${currentNetwork.explorerUrl}/#/tx/${hash}`"
    >
      {{ $t('transfer.transaction.details.to-explorer') }}
    </AeButton>
  </MobilePage>
</template>

<script>
import { mapGetters } from 'vuex';
import { pluck } from 'rxjs/operators';
import prefixedAmount from '../../filters/prefixedAmount';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
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
    AccountInline,
    DetailsField,
    DetailsAmountAndFee,
    DetailsAmount,
    DetailsAddress,
    AeButton,
  },
  filters: { prefixedAmount },
  props: {
    hash: { type: String, required: true },
  },
  computed: {
    ...mapGetters({ activeAccount: 'accounts/active', currentNetwork: 'currentNetwork' }),
    status() {
      return this.transaction.pending
        ? this.$t('transfer.transaction.pending')
        : this.$tc(
          'transfer.transaction.details.confirmations',
          this.transaction.confirmationCount,
        );
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
    font-family: $font-mono;
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
