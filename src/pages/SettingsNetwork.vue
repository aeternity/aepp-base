<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'settings' }"
    title="Network"
    back-button
    class="settings"
  >
    <heading>Available networks</heading>
    <item
      v-for="network in networks"
      :key="network.url">
      {{ network.name }}
      <ae-radio
        slot="right"
        :checked="network.url === rpcUrl"
        name="network"
        @change="setRPCUrl(network.url)"
      />
    </item>
    <item inactive>
      Network ID
      <span slot="right">{{ networkId }}</span>
    </item>
  </mobile-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MobilePage from '../components/MobilePage.vue';
import AeRadio from '../components/AeRadio.vue';
import SettingsHeading from '../components/SettingsHeading.vue';
import ListItem from '../components/ListItem.vue';
import networks from '../lib/networksRegistry';

export default {
  components: {
    MobilePage,
    AeRadio,
    Heading: SettingsHeading,
    Item: ListItem,
  },
  data: () => ({ networks }),
  computed: mapState(['rpcUrl', 'networkId']),
  methods: mapMutations(['setRPCUrl']),
};
</script>

<style src="./Settings.scss" lang="scss" scoped />
