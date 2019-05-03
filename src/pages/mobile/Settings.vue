<template>
  <MobilePage
    class="settings"
    fill="neutral"
  >
    <Guide>
      <em>Settings</em>
    </Guide>
    <AeCard fill="maximum">
      <ListItem
        :to="{ name: 'settings-network' }"
        :subtitle="networkName"
        title="Network"
      >
        <AeIcon
          slot="icon"
          fill="secondary"
          face="round"
          name="globe"
        />
        <AeIcon
          slot="right"
          name="left-more"
        />
      </ListItem>
      <ListItem
        :to="{ name: 'settings-remote-connection' }"
        :subtitle="
          `${remoteConnectionsCount} device${remoteConnectionsCount === 1 ? '' : 's'} connected`"
        title="Remote connections"
      >
        <AeIcon
          slot="icon"
          fill="alternative"
          face="round"
          name="device"
        />
        <AeIcon
          slot="right"
          name="left-more"
        />
      </ListItem>
      <ListItem
        :to="{ name: 'settings-aepp-account-access' }"
        :subtitle="`${appsLength} aepp${appsLength > 1? 's' : ''} have account access`"
        title="Aepp account access"
      >
        <AeIcon
          slot="icon"
          face="round"
          name="grid"
        />
        <AeIcon
          slot="right"
          name="left-more"
        />
      </ListItem>
    </AeCard>
    <h2>Account</h2>
    <AeCard fill="maximum">
      <ListItem
        title="Logout"
        subtitle="And see you soon!"
        @click="logout"
      >
        <AeIcon
          slot="icon"
          fill="secondary"
          face="round"
          name="share"
        />
      </ListItem>
      <ListItem
        title="Reset Key Storage"
        subtitle="After resetting, a recovery is required"
        @click="signOut"
      >
        <AeIcon
          slot="icon"
          fill="primary"
          face="round"
          name="sign-out"
        />
      </ListItem>
    </AeCard>
    <div
      class="version"
    >
      Version {{ version }}
    </div>
  </MobilePage>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { get } from 'lodash-es';
import { AeIcon } from '@aeternity/aepp-components-3';
import AeCard from '../../components/AeCard.vue';
import MobilePage from '../../components/mobile/Page.vue';
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
    appsLength: ({ apps }) => apps.filter(app => get(app, 'permissions.accessToAccounts.length', 0)).length,
    networkName: (state, { currentNetwork }) => currentNetwork.name,
    remoteConnectionsCount: ({ mobile }) => Object.entries(mobile.followers)
      .filter(([, f]) => f.connected).length,
  }),
  methods: {
    signOut() {
      this.$store.dispatch('reset');
      setTimeout(() => this.$store.commit('setLoginTarget'));
    },
    ...mapActions(['logout']),
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

    .ae-icon-device {
      background-color: #515ec8;
    }

    .ae-icon-grid {
      background-color: #f8963d;
    }

    .ae-icon-left-more {
      font-size: rem(20px);
    }
  }

  h2 {
    @extend %face-sans-s;
    margin-top: rem(30px);
    font-weight: 500;
  }

  .version {
    margin: rem(24px) 0;
    @extend %face-sans-s;
    color: $color-neutral-negative-1;
    text-align: center;
  }
}
</style>
