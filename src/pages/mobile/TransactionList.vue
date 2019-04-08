<template>
  <MobilePage
    header-fill="primary"
    class="transaction-list"
    right-button-icon-name="close"
    @right-button-click="$router.push({ name: 'transfer' })"
  >
    <div
      slot="title"
      class="header"
    >
      <div>
        <AeIdenticon
          :address="activeIdentity.address"
          size="s"
        />
        {{ activeIdentity.name }}
      </div>
      <Balance
        :balance="activeIdentity.balance"
        invert
      />
    </div>

    <div class="tabs">
      <ButtonPlain :to="{ name: 'transaction-list' }">
        All
      </ButtonPlain>
      <ButtonPlain :to="{ name: 'transaction-list', params: { direction: 'incoming' } }">
        Incoming
      </ButtonPlain>
      <ButtonPlain :to="{ name: 'transaction-list', params: { direction: 'outgoing' } }">
        Outgoing
      </ButtonPlain>
    </div>

    <AeLoader v-if="waitingTransactions && !activeIdentity.transactions.length" />

    <template
      v-for="(transactions, date) in spendTransactionsGroupedByDay"
      v-else
    >
      <div
        :key="date"
        class="date"
      >
        {{ date }}
      </div>

      <ListItemTransaction
        v-for="transaction in transactions"
        :key="transaction.hash"
        v-bind="transaction"
        :to="{ name: 'transaction-details', params: { hash: transaction.hash } }"
      />
    </template>
  </MobilePage>
</template>

<script>
import { groupBy } from 'lodash-es';
import { mapGetters } from 'vuex';
import { AeIdenticon } from '@aeternity/aepp-components-3';
import MobilePage from '../../components/mobile/Page.vue';
import Balance from '../../components/Balance.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';
import AeLoader from '../../components/AeLoader.vue';
import ListItemTransaction from '../../components/ListItemTransaction.vue';

export default {
  components: {
    MobilePage,
    AeIdenticon,
    Balance,
    ButtonPlain,
    AeLoader,
    ListItemTransaction,
  },
  props: {
    direction: {
      type: String,
      validator: value => ['', 'incoming', 'outgoing'].includes(value),
      default: '',
    },
  },
  data: () => ({
    waitingTransactions: true,
  }),
  computed: {
    ...mapGetters(['activeIdentity']),
    spendTransactionsGroupedByDay() {
      const account = this.activeIdentity;
      return groupBy(
        [...account.transactions]
          .filter(t => t.tx.type === 'SpendTx')
          .filter(t => (
            (this.direction === 'incoming' && t.received)
            || (this.direction === 'outgoing' && !t.received)
            || this.direction === ''
          ))
          .sort((t1, t2) => t2.time - t1.time),
        (tx) => {
          const dateString = tx.time.toDateString();
          return dateString === new Date().toDateString() ? 'Today' : dateString;
        },
      );
    },
  },
  watch: {
    'activeIdentity.address': {
      async handler(address) {
        this.waitingTransactions = true;
        await this.$store.dispatch('updateTransactions', address);
        this.waitingTransactions = false;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.transaction-list {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .ae-identicon {
      vertical-align: middle;
    }

    .balance {
      @media (max-width: 370px) {
        display: none;
      }
    }
  }

  .tabs, .date {
    margin-left: rem(-48px);
    margin-right: rem(-48px);
    padding-left: rem(48px);
  }

  .tabs {
    box-shadow: 0 4px 2px -2px rgba(27, 68, 121, 0.1);

    .button-plain {
      margin-right: rem(16px);
      @extend %face-sans-s;
      font-weight: 500;
      letter-spacing: rem(0.2px);
      line-height: rem(46px);
      color: $color-neutral-negative-3;

      &.router-link-exact-active {
        padding-bottom: 0;
        border-bottom: rem(2px) solid $color-primary;
      }
    }
  }

  .ae-loader {
    display: block;
    margin: rem(60px) auto;
  }

  .date {
    position: sticky;
    top: rem(54px);
    top: calc(env(safe-area-inset-top) + #{rem(54px)});
    margin-top: rem(2px);
    height: rem(44px);
    @extend %face-uppercase-xs;
    font-weight: 500;
    line-height: rem(44px);
    vertical-align: middle;
    color: $color-neutral-negative-1;
    background-color: $color-neutral-positive-3;
  }
}
</style>