<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'transfer' }"
    class="receive"
    fill="neutral"
    back-button
  >
    <guide
      fill="primary"
    >
      <em>Receive</em> AE
      <div class="note">
        Let the sender scan this QR code
        <br>to obtain your address
      </div>
    </guide>

    <ae-account
      v-bind="activeIdentity"
      class="qrAccount"
      fill="primary"
      qr-side
    />

    <template slot="content-bottom">
      <list-item
        title="Copy address"
        subtitle="Share it with sender"
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
    </template>
  </mobile-page>
</template>

<script>
import { mapGetters } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import writingHandEmojiPath from 'emoji-datasource-apple/img/apple/64/270d-fe0f.png';
import copy from 'clipboard-copy';
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
      copied: false,
    };
  },
  computed: {
    ...mapGetters(['activeIdentity']),
  },
  methods: {
    copyAddress() {
      copy(this.activeIdentity.address);
      this.copied = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.receive {
  /deep/ .panel .bottom {
    padding-top: rem(60px);
  }

  .guide {
    margin-left: rem(20px);
  }

  .note {
    margin: rem(8px) 0;
    @extend %face-sans-s;
    font-weight: 500;
  }

  .list-item {
    /deep/ .content {
      border-top: none;
      border-bottom: 2px solid $color-neutral-positive-1;
    }

    img {
      margin: 0 rem(9px) rem(4px) 0;
      width: rem(33px);
    }
  }
}
</style>
