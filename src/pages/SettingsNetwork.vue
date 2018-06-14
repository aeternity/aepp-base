<template>
  <modal-page
    title="Network"
    :redirectToOnClose="{ name: 'settings' }"
    class="settings"
  >
    <heading>Available networks</heading>
    <item v-for="network in networks" :key="network.url">
      {{network.name}}
      <ae-radio
        slot="right"
        name="network"
        :value="network.url"
        :checked="network.url === rpcUrl"
        @change="setRPCUrl(network.url)"
      />
    </item>
    <item inactive>
      Network ID
      <span slot="right">{{networkId}}</span>
    </item>
  </modal-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ModalPage from '@/components/ModalPage.vue'
import AeRadio from '@/components/AeRadio.vue'
import SettingsHeading from '@/components/SettingsHeading'
import SettingsItem from '@/components/SettingsItem'
import networks from '@/lib/networksRegistry'

export default {
  components: {
    ModalPage,
    AeRadio,
    Heading: SettingsHeading,
    Item: SettingsItem
  },
  data: () => ({ networks }),
  computed: mapState(['rpcUrl', 'networkId']),
  methods: mapMutations(['setRPCUrl'])
}
</script>

<style src="./Settings.scss" lang="scss" scoped />
