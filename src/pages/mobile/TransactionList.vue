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
      <AccountInline :address="activeAccount.address" />
      <Balance
        :balance="activeAccount.balance"
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

    <template v-for="(transactions, date) in spendTransactionsGroupedByDay">
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

    <AeLoader v-if="transactions.status === 'loading'" />
    <div
      v-if="['ended', 'error'].includes(transactions.status)"
      class="no-transactions"
    >
      {{ transactions.status === 'error'
        ? 'An error occurred during transactions loading.'
        : transactions.list.length
          ? 'All transactions are loaded.'
          : 'There are no transaction associated with this account.' }}
    </div>
  </MobilePage>
</template>

<script>
import { Subject } from 'rxjs';
import { groupBy } from 'lodash-es';
import MobilePage from '../../components/mobile/Page.vue';
import AccountInline from '../../components/AccountInline.vue';
import Balance from '../../components/Balance.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';
import AeLoader from '../../components/AeLoader.vue';
import ListItemTransaction from '../../components/ListItemTransaction.vue';

export default {
  components: {
    MobilePage,
    AccountInline,
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
  subscriptions() {
    this.loadMore$ = new Subject();
    return {
      activeAccount: this.$store.state.observables.activeAccount,
      transactions: this.$store.state.observables.getTransactionList(this.loadMore$),
    };
  },
  computed: {
    spendTransactionsGroupedByDay() {
      return groupBy(
        this.transactions.list
          .filter(t => (
            (this.direction === 'incoming' && t.received)
            || (this.direction === 'outgoing' && !t.received)
            || this.direction === ''
          )),
        (tx) => {
          const dateString = tx.time.toDateString();
          return dateString === new Date().toDateString() ? 'Today' : dateString;
        },
      );
    },
  },
  mounted() {
    const checkLoadMore = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollHeight - scrollTop === clientHeight) {
        this.loadMore$.next(null);
      }
    };
    window.addEventListener('scroll', checkLoadMore);
    this.$once('hook:destroyed', () => window.removeEventListener('scroll', checkLoadMore));
    this.$watch(({ transactions }) => transactions, checkLoadMore);
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.transaction-list {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

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

  .no-transactions {
    margin-top: rem(10px);
    @extend %face-sans-base;
    text-align: center;
    font-weight: 500;
    color: $color-neutral-negative-3;
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
