<template>
  <MobilePage
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
        <br>from
        <AccountInline :address="transaction.tx.senderId" />
        <br>to
        <AccountInline :address="transaction.tx.recipientId" />
      </Guide>
    </template>

    <DetailsField
      class="details-date"
      name="Date"
      :value="transaction.time.toLocaleString()"
      fill="dark"
    />

    <DetailsField
      :class="{ 'pending': transaction.pending }"
      class="details-pending"
      name="Status"
      :value="status"
      fill="dark"
    />

    <DetailsAmountAndFee
      name="Transaction Fee"
      :amount="transaction.tx.amount"
      :fee="transaction.tx.fee"
      fill="dark"
    />

    <DetailsAddress
      name="From"
      :address="transaction.tx.senderId"
      fill="dark"
    />

    <DetailsAddress
      name="To"
      :address="transaction.tx.recipientId"
      fill="dark"
    />

    <DetailsAddress
      name="Tx hash"
      :address="transaction.hash"
      fill="dark"
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
import { pick } from 'lodash-es';
import { mapGetters } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import Balance from '../../components/Balance.vue';
import AccountInline from '../../components/AccountInline.vue';
import DetailsField from '../../components/mobile/DetailsField.vue';
import DetailsAmountAndFee from '../../components/mobile/DetailsAmountAndFee.vue';
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
    DetailsAddress,
    AeButton,
  },
  props: {
    hash: { type: String, required: true },
  },
  computed: {
    ...mapGetters(['activeIdentity', 'currentNetwork']),
    transaction() {
      return this.activeIdentity.transactions.find(t => t.hash === this.hash);
    },
    status() {
      return this.transaction.pending
        ? 'Pending'
        : `${this.topBlockHeight - this.transaction.blockHeight} Confirmations`;
    },
  },
  subscriptions() {
    return pick(this.$store.state.observables, ['topBlockHeight']);
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

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

  .details-pending /deep/ {
    .details-row .value {
      @extend %face-uppercase-xs;
      font-weight: bold;
      color: $color-alternative;
    }

    &.pending .details-row .value {
      color: $color-error;
    }
  }

  .details-date {
    border-top: none;

    /deep/ .details-row .value {
      @extend %face-uppercase-base;
      font-weight: 500;
    }
  }
}
</style>
