<template>
  <div class="account-switcher">
    <header>
      <AeAccount v-bind="activeAccount">
        <ButtonPlain
          slot="icon"
          v-copy-on-click="activeAccount.address"
        >
          <Copy />
        </ButtonPlain>
      </AeAccount>
    </header>

    <main>
      <ListItemAccount
        v-for="account in accounts"
        :key="account.address"
        v-bind="account"
      >
        <AeRadio
          slot="right"
          :checked="account.address === actualActiveAccount.address"
          @change="setActiveIdx(account.index)"
        />
      </ListItemAccount>

      <ListItem
        title="Create a new account"
        @click="createAccount"
      >
        <ListItemCircle slot="icon">
          <Plus />
        </ListItemCircle>
      </ListItem>
    </main>

    <Balance
      :balance="totalBalance"
      total
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import AeAccount from '../AeAccount.vue';
import ButtonPlain from '../ButtonPlain.vue';
import { Copy, Plus } from '../icons';
import ListItem from '../ListItem.vue';
import ListItemCircle from '../ListItemCircle.vue';
import ListItemAccount from '../ListItemAccount.vue';
import AeRadio from '../AeRadio.vue';
import Balance from '../Balance.vue';
import prefixedAmount from '../../filters/prefixedAmount';
import copyOnClick from '../../directives/copyOnClick';

export default {
  components: {
    AeAccount, ButtonPlain, Copy, ListItem, ListItemCircle, Plus, ListItemAccount, AeRadio, Balance,
  },
  directives: {
    copyOnClick,
  },
  props: {
    forLedger: Boolean,
  },
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
        ? this.actualActiveAccount : this.accounts[0];
    },
  },
  methods: {
    prefixedAmount,
    ...mapMutations({ setActiveIdx: 'accounts/setActiveIdx' }),
    createAccount() {
      this.$store.dispatch(`accounts/${this.forLedger ? 'ledger' : 'hdWallet'}/create`);
    },
    isAccountToShow({ source: { type } }) {
      return this.forLedger ? type === 'ledger' : type !== 'ledger';
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../styles/variables/colors.scss';
@import '../../styles/placeholders/typography.scss';

.account-switcher {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  header {
    background-color: $color-neutral-positive-2;
    padding: rem(60px) rem(40px);
    margin-bottom: rem(90px);

    .ae-account {
      margin-bottom: rem(-90px);
    }
  }

  main {
    flex-grow: 1;
    padding: 0 rem(40px);
  }

  .balance {
    padding: 0 rem(50px);
    border-top: rem(2px) solid $color-neutral-positive-2;
    line-height: 50px;
    text-align: right;
  }
}
</style>
