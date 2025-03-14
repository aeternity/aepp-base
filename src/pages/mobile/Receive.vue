<template>
  <Page
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
      <img slot="icon" :src="writingHandEmoji" />
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
      <img slot="icon" :src="envelopeEmoji" />
      <ListItemCircle v-if="sharedChecked" slot="right">
        <Check />
      </ListItemCircle>
    </ListItem>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex';
import writingHandEmoji from 'emoji-datasource-apple/img/apple/64/270d-fe0f.png';
import envelopeEmoji from 'emoji-datasource-apple/img/apple/64/2709-fe0f.png';
import copyOnClick from '../../directives/copyOnClick';
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import AeAccountReverse from '../../components/mobile/AeAccountReverse.vue';
import ListItem from '../../components/ListItem.vue';
import ListItemCircle from '../../components/ListItemCircle.vue';
import { Check } from '../../components/icons';

export default {
  components: {
    Page,
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
      sharingSupported: navigator.share || process.env.VUE_APP_CORDOVA,
      sharedChecked: false,
    };
  },
  computed: mapGetters({ activeAccount: 'accounts/active' }),
  methods: {
    async share() {
      await this.$store.dispatch('share', { text: this.activeAccount.address });
      this.sharedChecked = true;
      setTimeout(() => {
        this.sharedChecked = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';

.receive .list-item {
  &.copy:not(.v-copied) .list-item-circle {
    display: none;
  }

  .list-item-circle {
    background-color: variables.$color-alternative;
  }
}
</style>
