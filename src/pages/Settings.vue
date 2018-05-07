<template>
  <modal-page
    title="Settings"
    :redirectToOnClose="{ name: 'apps' }"
    class="settings"
  >
    <heading>General settings</heading>
    <item :to="{ name: 'settings-network' }">
      Network
      <span class="mute">{{networkName}}</span>
    </item>
  </modal-page>
</template>

<script>
  import { mapState } from 'vuex'
  import { AeIcon } from '@aeternity/aepp-components'
  import ModalPage from '@/components/ModalPage.vue'
  import SettingsHeading from '@/components/SettingsHeading'
  import SettingsItem from '@/components/SettingsItem'
  import networks from '@/lib/networksRegistry'

  export default {
    components: {
      AeIcon,
      ModalPage,
      Heading: SettingsHeading,
      Item: SettingsItem
    },
    computed: mapState({
      networkName: ({ rpcUrl }) => networks.find(n => n.url === rpcUrl).name
    })
  }
</script>

<style src="./Settings.scss" lang="scss" scoped />

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .settings {
    .mute {
      color: $grey;
    }
  }
</style>
