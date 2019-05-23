<template>
  <SidebarModal
    v-if="showSidebar"
    class="sidebar"
    @close="toggleSidebar"
  >
    <header>
      <h1>
        <template v-if="!accountsCount">
          Connect an<br>account to start
        </template>
        <template v-else>
          Your connected<br>account{{ accountsCount !== 1 ? 's': '' }}
        </template>
        <ButtonPlain @click="toggleSidebar">
          <Close />
        </ButtonPlain>
      </h1>

      <div class="tabs">
        <ButtonPlain
          :class="{ active: !ledgerTab }"
          @click="ledgerTab = false"
        >
          Base æpp
        </ButtonPlain>
        <ButtonPlain
          :class="{ active: ledgerTab }"
          @click="ledgerTab = true"
        >
          Ledger
        </ButtonPlain>
      </div>
    </header>

    <Component
      :is="currentTab"
      :for-ledger="ledgerTab"
    />
  </SidebarModal>
</template>

<script>
import { uniq } from 'lodash-es';
import { mapState, mapMutations } from 'vuex';
import SidebarModal from './SidebarModal.vue';
import ConnectGuide from './ConnectGuide.vue';
import AccountSwitcher from './AccountSwitcher.vue';
import ButtonPlain from '../ButtonPlain.vue';
import { Close } from '../icons';

export default {
  components: {
    SidebarModal, ConnectGuide, AccountSwitcher, ButtonPlain, Close,
  },
  data: () => ({
    ledgerTab: false,
  }),
  computed: {
    ...mapState({
      showSidebar: ({ desktop }) => desktop.showSidebar,
      accountsCount: ({ accounts: { list } }) => list.length,
      accountTypes: ({ accounts: { list } }) => uniq(list.map(({ source: { type } }) => type)),
    }),
    currentTab() {
      return (this.accountTypes.includes('ledger') && this.ledgerTab)
      || (this.accountTypes.some(type => type !== 'ledger') && !this.ledgerTab)
        ? 'account-switcher' : 'connect-guide';
    },
  },
  methods: mapMutations(['toggleSidebar']),
};
</script>

<style scoped lang="scss">
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.sidebar {
  /deep/ .modal {
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
