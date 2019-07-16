<template>
  <MobilePage
    class="receive"
    :left-button-to="{ name: 'transfer' }"
    left-button-icon-name="back"
    header-fill="neutral"
  >
    <template slot="header">
      <Guide :template="$t('transfer.receive.guide')" />

      <AeAccountReverse v-bind="activeAccount" />
    </template>

    <ListItem
      v-copy-on-click="activeAccount.address"
      class="copy"
      :title="$t('transfer.receive.copy')"
      :subtitle="$t('transfer.receive.copy-subtitle')"
      border-dark
    >
      <ListItemCircle slot="right">
        <Check />
      </ListItemCircle>
    </ListItem>
    <ListItem
      v-if="sharingSupported"
      :title="$t('transfer.receive.share')"
      :subtitle="$t('transfer.receive.share-subtitle')"
      border-dark
      @click="share"
    >
      <ListItemCircle
        v-if="sharedChecked"
        slot="right"
      >
        <Check />
      </ListItemCircle>
    </ListItem>
  </MobilePage>
</template>

<script>
import { mapGetters } from 'vuex';
import copyOnClick from '../../directives/copyOnClick';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeAccountReverse from '../../components/mobile/AeAccountReverse.vue';
import ListItem from '../../components/ListItem.vue';
import ListItemCircle from '../../components/ListItemCircle.vue';
import { Check } from '../../components/icons';

export default {
  components: {
    MobilePage,
    Guide,
    AeAccountReverse,
    ListItem,
    ListItemCircle,
    Check,
  },
  directives: { copyOnClick },
  data() {
    return {
      sharingSupported: navigator.share || process.env.IS_CORDOVA,
      sharedChecked: false,
    };
  },
  computed: mapGetters({ activeAccount: 'accounts/active' }),
  methods: {
    async share() {
      await (process.env.IS_CORDOVA
        ? new Promise(resolve => window.plugins.socialsharing.shareWithOptions(
          { message: this.activeAccount.address },
          ({ app }) => app && resolve(),
        ))
        : navigator.share({ text: this.activeAccount.address }));

      this.sharedChecked = true;
      setTimeout(() => { this.sharedChecked = false; }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables/colors.scss';

.receive .list-item {
  &.copy:not(.v-copied) .list-item-circle {
    display: none;
  }

  .list-item-circle {
    background-color: $color-alternative;
  }
}
</style>
