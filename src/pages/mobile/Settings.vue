<template>
  <mobile-page
    class="settings"
    fill="neutral"
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
      <list-item
        :to="{ name: 'settings-network' }"
        :subtitle="networkName"
        title="Network"
      >
        <ae-icon
          slot="icon"
          fill="secondary"
          face="round"
          name="globe"
        />
      </list-item>
      <list-item
        v-if="$globals.IS_MOBILE_DEVICE"
        :to="{ name: 'settings-remote-connection' }"
        :subtitle="
          `${remoteConnectionsCount} device${remoteConnectionsCount === 1 ? '' : 's'} connected`"
        title="Remote connections"
      >
        <ae-icon
          slot="icon"
          fill="alternative"
          face="round"
          name="device"
        />
      </list-item>
    </ae-card>
    <div
      slot="footer"
      class="version"
    >
      Version {{ version }}
    </div>
  </mobile-page>
</template>

<script>
import { mapState } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import AeCard from '../../components/AeCard.vue';
import MobilePage from '../../components/MobilePage.vue';
import Guide from '../../components/Guide.vue';
import ListItem from '../../components/ListItem.vue';

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
  computed: mapState({
    networkName: (state, { currentNetwork }) => currentNetwork.name,
    remoteConnectionsCount: ({ mobile }) => Object.entries(mobile.followers)
      .filter(([, f]) => f.connected).length,
  }),
  methods: {
    signOut() {
      this.$store.commit('signOut');
      setTimeout(() => this.$store.commit('setLoginTarget'));
    },
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
  .ae-card {
    .ae-icon-share {
      transform: rotate(90deg);
    }
  }

  .version {
    margin: rem(24px) 0;
    @extend %face-sans-s;
    color: $color-neutral-negative-1;
    text-align: center;
  }
}
</style>
