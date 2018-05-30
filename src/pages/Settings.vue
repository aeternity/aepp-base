<template>
  <modal-page
    title="Settings"
    :redirectToOnClose="{ name: 'apps' }"
    class="settings"
  >
    <heading>General settings</heading>
    <item :to="{ name: 'settings-network' }">
      Network
      <span slot="right" class="mute">{{networkName}}</span>
    </item>
    <template v-if="IS_MOBILE_DEVICE">
      <heading>Add-ons</heading>
      <item :to="{ name: 'settings-remote-connection' }">
        <img src="/static/icons/remote-connect.svg" />
        Remote connection
        <ae-icon slot="right" name="chevron" />
      </item>
      <heading>Accounts</heading>
      <item @click="signOut" type="dramatic">
        Sign out on this device completely
      </item>
    </template>
  </modal-page>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { AeIcon } from '@aeternity/aepp-components'
  import ModalPage from '@/components/ModalPage.vue'
  import SettingsHeading from '@/components/SettingsHeading'
  import SettingsItem from '@/components/SettingsItem'
  import networks from '@/lib/networksRegistry'
  import IS_MOBILE_DEVICE from '@/lib/isMobileDevice'

  export default {
    components: {
      AeIcon,
      ModalPage,
      Heading: SettingsHeading,
      Item: SettingsItem
    },
    data: () => ({ IS_MOBILE_DEVICE }),
    computed: mapState({
      networkName: ({ rpcUrl }) => networks.find(n => n.url === rpcUrl).name
    }),
    methods: mapMutations(['signOut'])
  }
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
