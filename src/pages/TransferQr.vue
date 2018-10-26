<template>
  <mobile-page
    :close-button="true"
    class="transfer"
    @close="$router.push({ name: 'transfer' })"
  >
    <guide
      fill="primary"
      icon="↪"
    >
      <em>Let others scan</em>
      <br>your address
      <div class="note">
        Show the QR to receive
      </div>
    </guide>

    <ae-account
      v-bind="activeIdentity"
      :qr-side="true"
      class="qrAccount"
      fill="primary"
    />

    <list-item v-clipboard="activeIdentity.address">
      <img :src="writingHandEmoji">
      <div class="content">
        <div class="title">Copy address</div>
        <div class="subtitle">Save to clipboard</div>
      </div>
      <ae-icon
        slot="right"
        name="left-more"
      />
    </list-item>
  </mobile-page>
</template>

<script>
import { mapGetters } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import writingHandEmojiPath from 'emoji-datasource-apple/img/apple/64/270d-fe0f.png';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeAccount from '../components/AeAccount.vue';
import ListItem from '../components/ListItem.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeAccount,
    ListItem,
    AeIcon,
  },
  data() {
    return {
      writingHandEmoji: writingHandEmojiPath,
    };
  },
  computed: {
    ...mapGetters(['activeIdentity']),
  },
};
</script>

<style lang="scss" scoped>
@import './Transfer.scss';
@import '../components/MobilePage.scss';

.mobile-page {
  @include split-background($color-neutral-positive-2, 45%);
}
</style>
