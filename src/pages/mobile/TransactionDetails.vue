<template>
  <Page
    v-if="transaction"
    :header-fill="transaction.received ? 'alternative' : 'primary'"
    class="transaction-details"
    :title="$t('transfer.transaction.details.title')"
    left-button-icon-name="back"
    :left-button-to="{ name: 'transaction-list' }"
  >
    <template slot="header">
      <Guide fill="neutral">
        <template v-if="transaction.tx.amount">
          {{ transaction.received
            ? $t('transfer.transaction.details.received')
            : $t('transfer.transaction.details.sent') }}
          <em class="balance">{{ transaction.convertedAmount }}</em>
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
      :name="$t('transfer.transaction.details.type')"
      :value="$t('transfer.transaction.type')[transaction.tx.type]"
    />

    <DetailsField
      :class="{ pending: transaction.pending }"
      class="status"
      :name="$t('transfer.transaction.details.status')"
      :value="status"
    />

    <DetailsAmountCurrency
      v-if="transaction.received || !transaction.tx.amount"
      :amount="transaction.tx.amount || transaction.tx.fee"
      :name="transaction.tx.amount ? $t('transfer.amount') : $t('transfer.fee')"
      short
    />
    <DetailsAmountAndFee
      v-else
      :amount="transaction.tx.amount"
      :fee="transaction.tx.fee"
    />

    <DetailsAddress
      v-if="transaction.tx.accountId"
      :name="$t('transfer.transaction.details.account')"
      :address="transaction.tx.accountId"
    />

    <DetailsAddress
      v-if="transaction.tx.senderId"
      :name="$t('transfer.transaction.details.from')"
      :address="transaction.tx.senderId"
    />

    <DetailsAddress
      v-if="transaction.tx.recipientId"
      :name="transaction.tx.type === 'NameTransferTx'
        ? $t('transfer.transaction.details.name-owner') : $t('transfer.transaction.details.to')"
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

    <AeButton
      slot="footer"
      :fill="transaction.received ? 'alternative' : 'primary'"
      :to="`${currentNetwork.explorerUrl}/transactions/${hash}`"
    >
      {{ $t('transfer.transaction.details.to-explorer') }}
    </AeButton>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex';
import { pluck } from 'rxjs/operators';
import prefixedAmount from '../../filters/prefixedAmount';
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import AccountInline from '../../components/AccountInline.vue';
import DetailsField from '../../components/mobile/DetailsField.vue';
import DetailsAmountAndFee from '../../components/mobile/DetailsAmountAndFee.vue';
import DetailsAmountCurrency from '../../components/mobile/DetailsAmountCurrency.vue';
import DetailsAddress from '../../components/mobile/DetailsAddress.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    Page,
    Guide,
    AccountInline,
    DetailsField,
    DetailsAmountAndFee,
    DetailsAmountCurrency,
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
@use '../../styles/variables';

.transaction-details {
  ::v-deep main {
    margin-top: 0;
    padding-top: 0;
  }

  .guide .balance {
    font-family: variables.$font-mono;
  }

  .details-item {
    &:first-child {
      border-top: none;
    }

    &.status {
      --color-primary: #{variables.$color-alternative};

      &.pending {
        --color-primary: #{variables.$color-primary};
      }

      ::v-deep .value {
        text-transform: uppercase;
      }
    }

    --color-primary: #{variables.$color-neutral-negative-3};
    --color-secondary: #{variables.$color-neutral-negative-1};
  }
}
</style>
