<template>
  <mobile-page
    class="receive"
    fill="neutral"
  >
    <guide
      fill="primary"
    >
      <em>Receive</em> tokens
      <div class="note">
        Scan this QR code to receive
        <br>tokens on this address
      </div>
    </guide>

    <ae-account
      v-bind="activeIdentity"
      :qr-side="true"
      class="qrAccount"
      fill="primary"
    />

    <template slot="content-bottom">
      <list-item @click.native="copyAddress">
        <img :src="writingHandEmoji">
        <div class="content">
          <div class="title">Copy address</div>
          <div class="subtitle">Save to clipboard</div>
        </div>
        <ae-icon
          v-if="copied"
          slot="right"
          fill="alternative"
          face="round"
          name="check"
        />
      </list-item>
    </template>

    <migrated-balance-modal />
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
import MigratedBalanceModal from '../components/MigratedBalanceModal.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeAccount,
    ListItem,
    AeIcon,
    MigratedBalanceModal,
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
    margin-top: rem(-31px);
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
    margin: rem(60px) rem(18px);
    padding: rem(8px) 0 rem(8px) rem(8px);
    width: auto;
    border: solid $color-neutral-positive-1;
    border-width: 2px 0;

    img {
      margin: 0 rem(9px) rem(4px) 0;
      width: rem(33px);
    }

    .content {
      .title {
        @extend %face-sans-s;
        font-weight: 500;
        color: $color-neutral-negative-3;
      }

      .subtitle {
        @extend %face-sans-xs;
        color: $color-neutral-negative-1;
      }
    }
  }
}
</style>
