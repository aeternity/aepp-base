<template>
  <SidebarModal
    v-if="showSidebar"
    class="sidebar"
    @close="toggleSidebar"
  >
    <header>
      <h1>
        <template v-if="!accountsCount">
          {{ $t('sidebar.connect-account') }}
        </template>
        <template v-else>
          {{ $tc('sidebar.connected-account', accountsCount) }}
        </template>
        <ButtonPlain @click="toggleSidebar">
          <Close />
        </ButtonPlain>
      </h1>

      <div class="tabs">
        <ButtonPlain
          :class="{ active: selectedTab === 'hd-wallet-desktop' }"
          @click="selectedTab = 'hd-wallet-desktop'"
        >
          {{ $t('sidebar.local') }}
        </ButtonPlain>
        <ButtonPlain
          :class="{ active: selectedTab === 'hd-wallet' }"
          @click="selectedTab = 'hd-wallet'"
        >
          {{ $t('sidebar.remote') }}
        </ButtonPlain>
        <ButtonPlain
          :class="{ active: selectedTab === 'ledger' }"
          @click="selectedTab = 'ledger'"
        >
          {{ $t('sidebar.ledger') }}
        </ButtonPlain>
      </div>
    </header>

    <Component
      :is="currentTab"
      :account-type="selectedTab"
    />
  </SidebarModal>
</template>

<script>
import { uniq } from 'lodash-es';
import { mapState, mapMutations } from 'vuex';
import SidebarModal from './SidebarModal.vue';
import CreateOrRecover from './CreateOrRecover.vue';
import ConnectGuide from './ConnectGuide.vue';
import AccountSwitcher from './AccountSwitcher.vue';
import ButtonPlain from '../ButtonPlain.vue';
import { Close } from '../icons';

export default {
  components: {
    SidebarModal, CreateOrRecover, ConnectGuide, AccountSwitcher, ButtonPlain, Close,
  },
  data: () => ({
    selectedTab: 'hd-wallet-desktop',
  }),
  computed: {
    ...mapState({
      showSidebar: ({ desktop }) => desktop.showSidebar,
      accountsCount: ({ accounts: { list } }) => list.length,
      accountTypes: ({ accounts: { list } }) => uniq(list.map(({ source: { type } }) => type)),
    }),
    currentTab() {
      return (this.accountTypes.includes('hd-wallet-desktop') && this.selectedTab === 'hd-wallet-desktop')
        || (this.accountTypes.some((type) => !['hd-wallet-desktop', 'ledger'].includes(type)) && this.selectedTab === 'hd-wallet')
        || (this.accountTypes.includes('ledger') && this.selectedTab === 'ledger')
        ? 'account-switcher' : {
          'hd-wallet-desktop': 'create-or-recover',
          'hd-wallet': 'connect-guide',
          ledger: 'connect-guide',
        }[this.selectedTab];
    },
  },
  methods: mapMutations(['toggleSidebar']),
};
</script>

<style scoped lang="scss">
@import '../../styles/typography';

.sidebar {
  ::v-deep .modal {
    display: flex;
    flex-direction: column;
  }

  header {
    background-color: $color-neutral-positive-2;

    h1 {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin: 0;
      padding: rem(25px) rem(40px);
      @extend %face-sans-l;
      font-weight: 500;

      .icon {
        display: block;
        margin-top: rem(5px);
      }
    }

    .tabs {
      display: flex;
      justify-content: center;

      .button-plain {
        width: rem(150px);
        padding-bottom: rem(1px);
        border-bottom: rem(1px) solid $color-neutral-positive-1;
        @extend %face-uppercase-xs;
        font-weight: bold;
        letter-spacing: rem(0.2px);
        line-height: rem(38px);

        &.active {
          padding-bottom: 0;
          border-bottom: rem(2px) solid $color-primary;
          color: $color-primary;
        }
      }
    }
  }
}
</style>
