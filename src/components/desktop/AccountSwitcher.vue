<template>
  <div class="account-switcher">
    <header>
      <ae-account
        v-bind="activeAccount"
        fill="primary"
      >
        <button-plain
          slot="icon"
          v-copy-to-clipboard="activeAccount.address"
        >
          <ae-icon name="copy" />
        </button-plain>
      </ae-account>
    </header>

    <main>
      <list-item
        v-for="(account, index) in accounts"
        :key="account.address"
        :title="account.name"
        :subtitle="`${prefixedAmount(account.balance)} AE`"
        subtitle-monospace
      >
        <ae-identicon
          slot="icon"
          :address="account.address"
        />
        <ae-radio
          slot="right"
          :checked="account === activeAccount"
          @change="selectIdentity(index)"
        />
      </list-item>

      <list-item
        v-if="ableToCreateAccount"
        title="Create a new account"
        @click="createAccount"
      >
        <ae-icon
          slot="icon"
          fill="primary"
          face="round"
          name="plus"
        />
      </list-item>
    </main>

    <balance
      :balance="totalBalance"
      total
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { AeIcon, AeIdenticon, directives } from '@aeternity/aepp-components-3';
import AeAccount from '../AeAccount.vue';
import ButtonPlain from '../ButtonPlain.vue';
import ListItem from '../ListItem.vue';
import AeRadio from '../AeRadio.vue';
import Balance from '../Balance.vue';
import prefixedAmount from '../../filters/prefixedAmount';

export default {
  components: {
    AeAccount, ButtonPlain, AeIcon, ListItem, AeIdenticon, AeRadio, Balance,
  },
  directives: {
    copyToClipboard: directives.copyToClipboard,
  },
  props: {
    forLedger: { type: Boolean, default: false },
  },
  computed: mapGetters({
    accounts: 'identities',
    activeAccount: 'activeIdentity',
    totalBalance: 'totalBalance',
    ableToCreateAccount: 'ableToCreateAccount',
  }),
  mounted() {
    this.$store.dispatch('updateAllBalances');
  },
  methods: {
    prefixedAmount,
    ...mapMutations(['selectIdentity', 'createAccount']),
  },
};
</script>

<style scoped lang="scss">
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

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

      .ae-icon {
        color: #fff;
        font-size: 18px;
      }
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
