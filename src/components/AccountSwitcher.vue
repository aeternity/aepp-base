<template>
  <div
    v-if="showAccountSwitcher"
    class="account-switcher"
  >
    <transition
      appear
      name="fade"
    >
      <ae-card
        v-clickaway="toggleAccountSwitcher"
        fill="maximum"
      >
        <div class="list">
          <list-item
            v-for="(account, index) in identities"
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
              :checked="index === selectedIdentityIdx"
              @change="selectIdentity(index)"
            />
          </list-item>

          <list-item
            :to="{ name: 'accounts-new' }"
            title="Create a new account"
            @click.native="toggleAccountSwitcher"
          >
            <ae-icon
              slot="icon"
              fill="primary"
              face="round"
              name="plus"
            />
          </list-item>

          <list-item
            title="Create a vault for AirGap"
            @click="toggleAccountSwitcher"
          >
            <ae-icon
              slot="icon"
              fill="alternative"
              face="round"
              name="plus"
            />
          </list-item>
        </div>
        <balance
          :balance="totalBalance"
          total
        />
      </ae-card>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { AeIcon, AeIdenticon } from '@aeternity/aepp-components-3';
import { directive as clickaway } from 'vue-clickaway';
import ListItem from './ListItem.vue';
import AeCard from './AeCard.vue';
import AeRadio from './AeRadio.vue';
import Balance from './Balance.vue';
import prefixedAmount from '../filters/prefixedAmount';

export default {
  directives: {
    clickaway,
  },
  components: {
    AeIcon,
    ListItem,
    AeCard,
    AeIdenticon,
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
  methods: {
    prefixedAmount,
    ...mapMutations(['selectIdentity', 'toggleAccountSwitcher']),
  },
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
      overflow: scroll;
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
