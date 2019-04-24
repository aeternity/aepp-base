<template>
  <Transition
    appear
    name="fade"
  >
    <Overlay
      class="account-switcher-modal"
      @click="resolve"
    >
      <AeCard fill="maximum">
        <ListItemAccount
          v-for="(account, index) in accounts"
          :key="account.address"
          v-bind="account"
        >
          <AeRadio
            slot="right"
            :checked="index === selectedAccountIdx"
            @change="setSelectedAccountIdx(index)"
          />
        </ListItemAccount>

        <ListItem
          :to="{ name: 'accounts-new' }"
          title="New subaccount"
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
        >
          <AeIcon
            slot="icon"
            fill="alternative"
            face="round"
            name="plus"
          />
        </ListItem>

        <Balance
          :balance="totalBalance"
          total
        />
      </AeCard>

      <div class="arrow" />

      <TabBar
        show-account-switcher
        @click.native="resolve"
      />
    </Overlay>
  </Transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { pick } from 'lodash-es';
import { AeIcon } from '@aeternity/aepp-components-3';
import Overlay from '../Overlay.vue';
import ListItem from '../ListItem.vue';
import ListItemAccount from '../ListItemAccount.vue';
import AeCard from '../AeCard.vue';
import AeRadio from '../AeRadio.vue';
import Balance from '../Balance.vue';
import TabBar from './TabBar.vue';

export default {
  components: {
    Overlay,
    AeIcon,
    ListItem,
    ListItemAccount,
    AeCard,
    AeRadio,
    Balance,
    TabBar,
  },
  props: {
    resolve: { type: Function, required: true },
  },
  computed: mapState(['selectedAccountIdx']),
  subscriptions() {
    return pick(this.$store.state.observables, ['accounts', 'totalBalance']);
  },
  methods: mapMutations(['setSelectedAccountIdx']),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/fallback/mixins.scss';

.account-switcher-modal {
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  background-color: rgba($color-neutral-positive-2, 0.8);
  padding: 0;

  &.fade-enter-active {
    transition-duration: 0.25s;

    .ae-card, .arrow {
      transition: opacity 0.25s ease-out;
    }
  }

  &.fade-enter {
    .ae-card, .arrow {
      opacity: 0;
    }
  }

  .ae-card {
    max-width: rem($screen-phone - 32px * 2);
    margin: rem(100px) rem(32px) 0 rem(32px);
    overflow-y: auto;

    @include abovePhone {
      width: 100%;
      align-self: center;
    }

    .balance {
      position: sticky;
      bottom: 0;
      background-color: $color-neutral-maximum;
      display: block;
      margin: 0 rem(14px);
      padding: rem(5px) rem(2px);
      border-top: 2px solid $color-neutral-positive-2;
      text-align: right;
    }
  }

  .arrow {
    align-self: center;
    margin-bottom: rem(10px);
    border: solid rem(12px) transparent;
    border-bottom-width: 0;
    border-top-color: $color-neutral-maximum;
    z-index: 1;
  }
}
</style>
