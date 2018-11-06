<template>
  <mobile-page
    class="receive"
  >
    <guide
      fill="primary"
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

    <template slot="content-bottom">
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
    </template>
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
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';

.receive {
  /deep/ .top {
    background: $color-neutral-positive-2;
  }

  /deep/ .bottom {
    background: $color-neutral-maximum;
  }

  @include split-background($color-neutral-positive-2, 37%);

  .note {
    @extend %face-sans-s;
    font-weight: 500;
  }

  .ae-account {
    margin: rem(39px) rem(16px) 0 rem(16px);
    width: auto;
  }

  .list-item {
    margin: rem(60px) rem(30px);
    padding: rem(8px) rem(8px);
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
