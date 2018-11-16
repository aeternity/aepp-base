<template>
  <mobile-page
    class="settings"
  >
    <guide fill="primary">
      <em>Settings</em>
    </guide>
    <template v-if="$globals.IS_MOBILE_DEVICE">
      <ae-card
        fill="maximum"
      >
        <list-item @click.native="logOut">
          <ae-icon
            fill="secondary"
            face="round"
            name="share"
          />
          <div class="content">
            <div class="title">Logout</div>
            <div class="subtitle">And login easily with your password</div>
          </div>
        </list-item>
        <list-item @click.native="signOut">
          <ae-icon
            fill="primary"
            face="round"
            name="sign-out"
          />
          <div class="content">
            <div class="title">Reset</div>
            <div class="subtitle">After resetting, a recovery is required</div>
          </div>
        </list-item>
      </ae-card>
    </template>
    <div
      slot="content-bottom"
      class="version"
    >Version {{ version }}</div>
  </mobile-page>
</template>

<script>
import { mapMutations } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import AeCard from '../components/AeCard.vue';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import ListItem from '../components/ListItem.vue';

export default {
  components: {
    AeIcon,
    MobilePage,
    Guide,
    AeCard,
    ListItem,
  },
  data() {
    return {
      version: process.env.npm_package_version,
    };
  },
  methods: {
    ...mapMutations(['signOut']),
    logOut() {
      this.$store.commit('setDerivedKey');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';

.settings {
  background-color: $color-neutral-positive-2;

  /deep/ .panel {
    justify-content: space-between;

    .bottom {
      margin-bottom: rem(87px);

      .content {
        margin: 0 auto;
        @extend %face-sans-s;
        color: $color-neutral-negative-1;
      }
    }
  }

  .guide {
    margin-left: rem(20px);
  }

  .ae-card {
    margin: 0 auto;

    .list-item {
      padding: rem(8px) 0 rem(8px) rem(20px);
      width: auto;
      border: none;

      .content {
        margin-left: rem(13px);

        .title {
          @extend %face-sans-s;
          font-weight: 500;
          color: $color-neutral-negative-3;
        }

        .subtitle {
          @extend %face-sans-xs;
          color: $color-neutral-negative-1;
          letter-spacing: normal;
        }
      }

      &:first-child {
        border-bottom: 2px solid $color-neutral-positive-2;

        .ae-icon {
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>
