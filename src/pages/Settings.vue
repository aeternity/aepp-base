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
        @click.native="signOut"
      >
        <ae-icon
          fill="primary"
          face="round"
          name="sign-out"
        />
        Sign out on this device
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

export default {
  components: {
    AeIcon,
    MobilePage,
    Guide,
    AeCard,
  },
  data() {
    return {
      version: process.env.npm_package_version,
    };
  },
  methods: mapMutations(['signOut']),
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
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
    padding: rem(20px);
    width: 80%;
    font-weight: 500;

    .ae-icon {
      margin-right: rem(11px);
    }
  }
}
</style>
