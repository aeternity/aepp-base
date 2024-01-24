<template>
  <Page
    header-fill="primary"
    class="transaction-list"
    :right-button-icon-name="$globals.DISABLED_BROWSER ? '' : 'close'"
    :right-button-to="$globals.DISABLED_BROWSER ? '' : { name: 'transfer' }"
  >
    <div
      slot="title"
      class="header"
    >
      <AccountInline :address="activeAccount.address" />
    </div>

    <div class="tabs">
      <ButtonPlain :to="{ name: 'transaction-list' }">
        {{ $t('transfer.transaction.list.all') }}
      </ButtonPlain>
      <ButtonPlain :to="{ name: 'transaction-list', params: { direction: 'incoming' } }">
        {{ $t('transfer.transaction.list.incoming') }}
      </ButtonPlain>
      <ButtonPlain :to="{ name: 'transaction-list', params: { direction: 'outgoing' } }">
        {{ $t('transfer.transaction.list.outgoing') }}
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

    <AeSpinner v-if="transactions.status === 'loading'" />
    <div
      v-if="['ended', 'error'].includes(transactions.status)"
      class="no-transactions"
    >
      {{ transactions.status === 'error'
        ? $t('transfer.transaction.list.error')
        : transactions.list.length
          ? $t('transfer.transaction.list.loaded')
          : $t('transfer.transaction.list.no-transactions') }}
    </div>
  </Page>
</template>

<script>
import { Subject } from 'rxjs';
import { groupBy } from 'lodash-es';
import { mapGetters } from 'vuex';
import Page from '../../components/Page.vue';
import AccountInline from '../../components/AccountInline.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';
import AeSpinner from '../../components/AeSpinner.vue';
import ListItemTransaction from '../../components/ListItemTransaction.vue';

export default {
  components: {
    Page,
    AccountInline,
    ButtonPlain,
    AeSpinner,
    ListItemTransaction,
  },
  props: {
    direction: {
      type: String,
      validator: (value) => ['', 'incoming', 'outgoing'].includes(value),
      default: '',
    },
  },
  subscriptions() {
    this.loadMore$ = new Subject();
    return {
      transactions: this.$store.state.observables.getTransactionList(this.loadMore$),
    };
  },
  computed: {
    spendTransactionsGroupedByDay() {
      return groupBy(
        this.transactions.list
          .filter((t) => (
            (this.direction === 'incoming' && t.received)
            || (this.direction === 'outgoing' && !t.received)
            || this.direction === ''
          )),
        (tx) => {
          const dateString = tx.pending
            ? this.$t('transfer.transaction.list.pending-transactions')
            : tx.time.toDateString();
          return dateString === new Date().toDateString()
            ? this.$t('transfer.transaction.list.today')
            : dateString;
        },
      );
    },
    ...mapGetters({ activeAccount: 'accounts/active' }),
  },
  mounted() {
    const checkLoadMore = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        this.loadMore$.next(null);
      }
    };
    window.addEventListener('scroll', checkLoadMore);
    this.$once('hook:destroyed', () => window.removeEventListener('scroll', checkLoadMore));
    this.$watch(({ transactions, direction }) => [transactions, direction], ([transactions]) => {
      if (transactions.status === 'ended') return;
      checkLoadMore();
    });
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.transaction-list {
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tabs, .date {
    margin-left: functions.rem(-48px);
    margin-right: functions.rem(-48px);
    padding-left: functions.rem(48px);
  }

  .tabs {
    box-shadow: 0 4px 2px -2px rgba(27, 68, 121, 0.1);

    .button-plain {
      margin-right: functions.rem(16px);
      @extend %face-sans-s;
      font-weight: 500;
      letter-spacing: functions.rem(0.2px);
      line-height: functions.rem(46px);
      color: variables.$color-neutral-negative-3;

      &.router-link-exact-active {
        padding-bottom: 0;
        border-bottom: functions.rem(2px) solid variables.$color-primary;
      }
    }
  }

  .no-transactions {
    margin-top: functions.rem(10px);
    @extend %face-sans-base;
    text-align: center;
    font-weight: 500;
    color: variables.$color-neutral-negative-3;
  }

  .date {
    position: sticky;
    top: functions.rem(54px);
    top: calc(env(safe-area-inset-top) + #{functions.rem(54px)});
    margin-top: functions.rem(2px);
    height: functions.rem(44px);
    @extend %face-uppercase-xs;
    font-weight: 500;
    line-height: functions.rem(44px);
    vertical-align: middle;
    color: variables.$color-neutral-negative-1;
    background-color: variables.$color-neutral-positive-3;
  }
}
</style>
