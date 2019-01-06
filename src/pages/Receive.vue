<template>
  <mobile-page
    :left-button-to="{ name: 'transfer' }"
    left-button-icon-name="back"
    class="receive"
    header-fill="neutral"
  >
    <template slot="header">
      <guide fill="primary">
        <em>Receive</em> AE
        <div class="note">
          Let the sender scan this QR code
          <br>to obtain your address
        </div>
      </guide>

      <ae-account-reverse
        v-bind="activeIdentity"
        fill="neutral"
      />
    </template>

    <list-item
      title="Copy address"
      subtitle="Share it with sender"
      border-dark
      @click.native="copyAddress"
    >
      <img
        slot="icon"
        :src="writingHandEmoji"
      >
      <ae-icon
        v-if="copied"
        slot="right"
        fill="alternative"
        face="round"
        name="check"
      />
    </list-item>
  </mobile-page>
</template>

<script>
import { mapGetters } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import writingHandEmojiPath from 'emoji-datasource-apple/img/apple/64/270d-fe0f.png';
import copy from 'clipboard-copy';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeAccountReverse from '../components/AeAccountReverse.vue';
import ListItem from '../components/ListItem.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeAccountReverse,
    ListItem,
    AeIcon,
  },
  data() {
    return {
      writingHandEmoji: writingHandEmojiPath,
      copied: false,
    };
  },
  computed: mapGetters(['activeIdentity']),
  methods: {
    copyAddress() {
      copy(this.activeIdentity.address);
      this.copied = true;
      setTimeout(() => { this.copied = false; }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.receive {
  .note {
    margin: rem(8px) 0;
    @extend %face-sans-s;
    font-weight: 500;
  }
}
</style>
