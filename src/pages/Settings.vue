<template>
  <mobile-page
    title="Settings"
    class="settings"
  >
    <heading>General settings</heading>
    <item :to="{ name: 'settings-network' }">
      Network
      <span
        slot="right"
        class="mute">{{ networkName }}</span>
    </item>
    <template v-if="$globals.IS_MOBILE_DEVICE">
      <heading>Add-ons</heading>
      <item :to="{ name: 'settings-remote-connection' }">
        <img src="../assets/icons/remote-connect.svg" >
        Remote connection
        <ae-icon
          slot="right"
          name="chevron" />
      </item>
      <heading>Accounts</heading>
      <item
        type="dramatic"
        @click="signOut">
        Sign out on this device completely
      </item>
    </template>
  </mobile-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components';
import MobilePage from '../components/MobilePage.vue';
import SettingsHeading from '../components/SettingsHeading.vue';
import ListItem from '../components/ListItem.vue';
import networks from '../lib/networksRegistry';

export default {
  components: {
    AeIcon,
    MobilePage,
    Heading: SettingsHeading,
    Item: ListItem,
  },
  computed: mapState({
    networkName: ({ rpcUrl }) => networks.find(n => n.url === rpcUrl).name,
  }),
  methods: mapMutations(['signOut']),
};
</script>

<style src="./Settings.scss" lang="scss" scoped />

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.settings {
  .mute {
    color: $grey;
  }

  img {
    width: 20px;
    margin-right: 17px;
  }
}
</style>
