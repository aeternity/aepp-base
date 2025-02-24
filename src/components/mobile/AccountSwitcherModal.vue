<template>
  <Transition appear name="fade">
    <Overlay class="account-switcher-modal" @click="resolve">
      <AeCard fill="maximum">
        <ListItemAccount
          v-for="(account, index) in accounts"
          :key="account.address"
          v-bind="account"
        >
          <template slot="right">
            <AeRadio :checked="index === activeIdx" @change="setActiveIdx(index)" />
          </template>
        </ListItemAccount>

        <ListItem :title="$t('account-switcher.create-account')" @click="createHdWalletAccount">
          <ListItemCircle slot="icon">
            <Plus />
          </ListItemCircle>
        </ListItem>

        <ListItem
          :title="$t('account-switcher.create-vault')"
          class="vault-new"
          @click="createAirGapAccount"
        >
          <ListItemCircle slot="icon">
            <Plus />
          </ListItemCircle>
        </ListItem>

        <Balance :balance="totalBalance" total />
      </AeCard>

      <div class="arrow" />

      <TabBar show-account-switcher @click.native="resolve" />
    </Overlay>
  </Transition>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { pick } from 'lodash-es';
import Overlay from '../Overlay.vue';
import ListItem from '../ListItem.vue';
import ListItemAccount from '../ListItemAccount.vue';
import ListItemCircle from '../ListItemCircle.vue';
import { Plus } from '../icons';
import AeCard from '../AeCard.vue';
import AeRadio from '../AeRadio.vue';
import Balance from '../Balance.vue';
import TabBar from './TabBar.vue';

export default {
  components: {
    Overlay,
    ListItem,
    ListItemAccount,
    ListItemCircle,
    Plus,
    AeCard,
    AeRadio,
    Balance,
    TabBar,
  },
  props: {
    resolve: { type: Function, required: true },
  },
  computed: mapState('accounts', ['activeIdx']),
  subscriptions() {
    return pick(this.$store.state.observables, ['accounts', 'totalBalance']);
  },
  methods: {
    ...mapMutations('accounts', ['setActiveIdx']),
    ...mapActions({
      createHdWalletAccount: 'accounts/hdWallet/checkPreviousAndCreate',
      createAirGapAccount: 'accounts/airGap/create',
    }),
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/mixins';

.account-switcher-modal {
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  background-color: rgba(variables.$color-neutral-positive-2, 0.8);
  padding: 0;

  &.fade-enter-active {
    transition-duration: 0.25s;

    .ae-card,
    .arrow {
      transition: opacity 0.25s ease-out;
    }
  }

  &.fade-enter {
    .ae-card,
    .arrow {
      opacity: 0;
    }
  }

  .ae-card {
    max-width: functions.rem(variables.$screen-phone - 32px * 2);
    margin: functions.rem(100px) functions.rem(32px) 0 functions.rem(32px);
    overflow-y: auto;

    @include mixins.abovePhone {
      width: 100%;
      align-self: center;
    }

    .list-item.vault-new .list-item-circle {
      background-color: variables.$color-alternative;
    }

    .balance {
      position: sticky;
      bottom: 0;
      background-color: variables.$color-neutral-maximum;
      display: block;
      margin: 0 functions.rem(14px);
      padding: functions.rem(5px) functions.rem(2px);
      border-top: 2px solid variables.$color-neutral-positive-2;
      text-align: right;
    }
  }

  .arrow {
    align-self: center;
    margin-bottom: functions.rem(10px);
    border: solid functions.rem(12px) transparent;
    border-bottom-width: 0;
    border-top-color: variables.$color-neutral-maximum;
    z-index: 1;
  }
}
</style>
