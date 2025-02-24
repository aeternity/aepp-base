<template>
  <div class="account-switcher">
    <header>
      <AeAccount v-bind="activeAccount" />
    </header>

    <main>
      <ListItemAccount v-for="account in accounts" :key="account.address" v-bind="account">
        <AeRadio
          slot="right"
          :checked="account.address === actualActiveAccount.address"
          @change="setActiveIdx(account.index)"
        />
      </ListItemAccount>

      <ListItem :title="$t('account-switcher.create-account-desktop')" @click="createAccount">
        <ListItemCircle slot="icon">
          <Plus />
        </ListItemCircle>
      </ListItem>
    </main>

    <Balance :balance="totalBalance" total />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import AccountTypeMixin from './AccountTypeMixin';
import AeAccount from '../AeAccount.vue';
import { Plus } from '../icons';
import ListItem from '../ListItem.vue';
import ListItemCircle from '../ListItemCircle.vue';
import ListItemAccount from '../ListItemAccount.vue';
import AeRadio from '../AeRadio.vue';
import Balance from '../Balance.vue';
import prefixedAmount from '../../filters/prefixedAmount';

export default {
  components: {
    AeAccount,
    ListItem,
    ListItemCircle,
    Plus,
    ListItemAccount,
    AeRadio,
    Balance,
  },
  mixins: [AccountTypeMixin],
  subscriptions() {
    return {
      allAccounts: this.$store.state.observables.accounts,
      actualActiveAccount: this.$store.state.observables.activeAccount,
      totalBalance: this.$store.state.observables.totalBalance,
    };
  },
  computed: {
    accounts() {
      return this.allAccounts
        .map((account, index) => ({ ...account, index }))
        .filter(this.isAccountToShow);
    },
    activeAccount() {
      return this.isAccountToShow(this.actualActiveAccount)
        ? this.actualActiveAccount
        : this.accounts[0];
    },
  },
  methods: {
    prefixedAmount,
    ...mapMutations({ setActiveIdx: 'accounts/setActiveIdx' }),
    createAccount() {
      this.$store.dispatch(
        `accounts/${
          {
            'hd-wallet-desktop': 'hdWallet/checkPreviousAndCreate',
            'hd-wallet': 'hdWalletRemote/checkPreviousAndCreate',
            ledger: 'ledger/create',
          }[this.accountType]
        }`,
      );
    },
    isAccountToShow({ source: { type } }) {
      return type === this.accountType;
    },
  },
};
</script>

<style scoped lang="scss">
@use '../../styles/variables';
@use '../../styles/functions';

.account-switcher {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  header {
    background-color: variables.$color-neutral-positive-2;
    padding: functions.rem(60px) functions.rem(40px);
    margin-bottom: functions.rem(90px);

    .ae-account {
      margin-bottom: functions.rem(-90px);
    }
  }

  main {
    flex-grow: 1;
    padding: 0 functions.rem(40px);
  }

  .balance {
    padding: 0 functions.rem(50px);
    border-top: functions.rem(2px) solid variables.$color-neutral-positive-2;
    line-height: 50px;
    text-align: right;
  }
}
</style>
