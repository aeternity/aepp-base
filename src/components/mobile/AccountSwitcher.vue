<template>
  <div
    v-if="showAccountSwitcher"
    class="account-switcher"
  >
    <Transition
      appear
      name="fade"
    >
      <AeCard
        v-clickaway="toggleAccountSwitcher"
        fill="maximum"
      >
        <div class="list">
          <ListItemAccount
            v-for="(account, index) in identities"
            :key="account.address"
            v-bind="account"
          >
            <AeRadio
              slot="right"
              :checked="index === selectedIdentityIdx"
              @change="selectIdentity(index)"
            />
          </ListItemAccount>

          <ListItem
            :to="{ name: 'accounts-new' }"
            title="New subaccount"
            @click.native="toggleAccountSwitcher"
          >
            <AeIcon
              slot="icon"
              fill="primary"
              face="round"
              name="plus"
            />
          </ListItem>

          <ListItem
            v-if="$globals.UNFINISHED_FEATURES"
            :to="{ name: 'vault-new' }"
            title="Create a vault for AirGap"
            @click.native="toggleAccountSwitcher"
          >
            <AeIcon
              slot="icon"
              fill="alternative"
              face="round"
              name="plus"
            />
          </ListItem>
        </div>
        <Balance
          :balance="totalBalance"
          total
        />
      </AeCard>
    </Transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import { directive as clickaway } from 'vue-clickaway';
import ListItem from '../ListItem.vue';
import ListItemAccount from '../ListItemAccount.vue';
import AeCard from '../AeCard.vue';
import AeRadio from '../AeRadio.vue';
import Balance from '../Balance.vue';

export default {
  directives: {
    clickaway,
  },
  components: {
    AeIcon,
    ListItem,
    ListItemAccount,
    AeCard,
    AeRadio,
    Balance,
  },
  computed: {
    ...mapGetters(['activeIdentity', 'identities', 'totalBalance']),
    ...mapState({
      selectedIdentityIdx: ({ selectedIdentityIdx }) => selectedIdentityIdx,
      showAccountSwitcher: ({ mobile }) => mobile.showAccountSwitcher,
    }),
  },
  watch: {
    showAccountSwitcher(value) {
      if (!value) return;
      this.$store.dispatch('updateAllBalances');
    },
  },
  mounted() {
    this.$store.dispatch('updateAllBalances');
  },
  methods: mapMutations(['selectIdentity', 'toggleAccountSwitcher']),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.account-switcher {
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  background-color: rgba(#edf3f7, 0.8);

  .ae-card {
    &.fade-enter-active {
      transition: opacity 0.25s ease-out;
    }

    &.fade-enter {
      opacity: 0;
    }

    &.fade-enter-to {
      opacity: 1;
    }

    position: fixed;
    width: 84%;
    bottom: rem(90px);
    bottom: calc(#{rem(90px)} + env(safe-area-inset-bottom));
    left: 8%;
    border-radius: rem(8px);
    background-color: $color-neutral-maximum;
    overflow: visible;

    &:after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: rem(-12px);
      border: rem(8px) solid $color-neutral-maximum;
      transform-origin: 0 0;
      transform: rotate(-45deg);
      box-shadow: rem(-6px) rem(6px) rem(16px) rem(-1px) $color-shadow-alpha-15;
    }

    .list {
      max-height: 60vh;
      overflow-y: scroll;
      border-radius: rem(8px) rem(8px) 0 0;
    }

    .balance {
      display: block;
      margin: 0 rem(14px);
      padding: rem(5px) rem(2px);
      border-top: 2px solid $color-neutral-positive-2;
      text-align: right;
    }
  }
}
</style>
