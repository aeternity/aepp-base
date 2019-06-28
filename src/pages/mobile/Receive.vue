<template>
  <MobilePage
    class="receive"
    :left-button-to="{ name: 'transfer' }"
    left-button-icon-name="back"
    header-fill="neutral"
  >
    <template slot="header">
      <Guide>
        <em>Share your address</em>
        with sender
      </Guide>

      <AeAccountReverse v-bind="activeAccount" />
    </template>

    <ListItem
      v-copy-on-click="activeAccount.address"
      class="copy"
      title="Copy address"
      subtitle="Save to clipboard"
      border-dark
    >
      <img
        slot="icon"
        :src="writingHandEmoji"
      >
      <ListItemCircle slot="right">
        <Check />
      </ListItemCircle>
    </ListItem>
    <ListItem
      v-if="sharingSupported"
      title="Share address"
      subtitle="With others"
      border-dark
      @click="share"
    >
      <img
        slot="icon"
        :src="envelopeEmoji"
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
import writingHandEmoji from 'emoji-datasource-apple/img/apple/64/270d-fe0f.png';
import envelopeEmoji from 'emoji-datasource-apple/img/apple/64/2709-fe0f.png';
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
      writingHandEmoji,
      envelopeEmoji,
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
