<template>
  <sidebar-modal
    v-if="showSidebar"
    class="sidebar"
    @close="toggleSidebar"
  >
    <header>
      <h1>
        Connect an<br>account to start
        <button-plain @click="toggleSidebar"><ae-icon name="close" /></button-plain>
      </h1>

      <div class="tabs">
        <button-plain
          :class="{ active: !ledgerTab }"
          @click="ledgerTab = false"
        >Base æpp</button-plain>
        <button-plain
          :class="{ active: ledgerTab }"
          @click="ledgerTab = true"
        >Ledger</button-plain>
      </div>
    </header>

    <main>
      <connect-guide :for-ledger="ledgerTab" />
    </main>
  </sidebar-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import SidebarModal from './SidebarModal.vue';
import ConnectGuide from './ConnectGuide.vue';
import ButtonPlain from '../ButtonPlain.vue';
import Guide from '../Guide.vue';
import AeQrCode from '../AeQrCode.vue';

export default {
  components: {
    AeIcon, SidebarModal, ConnectGuide, ButtonPlain, Guide, AeQrCode,
  },
  data: () => ({
    ledgerTab: false,
  }),
  computed: mapState({
    showSidebar: ({ desktop }) => desktop.showSidebar,
  }),
  methods: mapMutations(['toggleSidebar']),
};
</script>

<style scoped lang="scss">
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.sidebar {
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

      .ae-icon {
        margin-top: rem(5px);
        font-size: rem(20px);
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

  main {
    margin: rem(60px) rem(40px);
  }
}
</style>
