<template>
  <mobile-page
    class="settings"
  >
    <guide fill="primary">
      <em>Settings</em>
    </guide>
    <ae-card fill="maximum">
      <template v-if="$globals.IS_MOBILE_DEVICE">
        <list-item
          title="Logout"
          subtitle="And see you soon!"
          @click="logOut"
        >
          <ae-icon
            slot="icon"
            fill="secondary"
            face="round"
            name="share"
          />
        </list-item>
        <list-item
          title="Reset Key Storage"
          subtitle="After resetting, a recovery is required"
          @click="signOut"
        >
          <ae-icon
            slot="icon"
            fill="primary"
            face="round"
            name="sign-out"
          />
        </list-item>
      </template>
    </ae-card>
    <div
      slot="content-bottom"
      class="version"
    >
      Version {{ version }}
    </div>
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
  data: () => ({
    version: process.env.npm_package_version,
  }),
  methods: {
    ...mapMutations(['signOut']),
    logOut() {
      this.$store.commit('setDerivedKey');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.settings {
  background-color: $color-neutral-positive-2;

  /deep/ .panel {
    justify-content: space-between;

    .bottom {
      margin-bottom: rem(87px);
      background-color: $color-neutral-positive-2;

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

    .ae-icon-share {
      transform: rotate(90deg);
    }
  }
}
</style>
