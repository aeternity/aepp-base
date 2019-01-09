<template>
  <mobile-page
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    title="Network"
    header-fill="light"
    fill="neutral"
    class="settings-network"
  >
    <ae-card fill="maximum">
      <list-item
        v-for="network in networks"
        :key="network.url"
        :title="network.name"
        :subtitle="network.url"
      >
        <ae-dropdown
          v-if="network.custom"
          slot="icon"
          direction="left"
        >
          <ae-icon
            slot="button"
            name="more"
          />
          <li>
            <ae-button-3 v-copyToClipboard="network.url">
              <ae-icon name="copy" />Copy link
            </ae-button-3>
          </li>
          <li>
            <ae-button-3 @click="removeNetwork">
              <ae-icon name="close" />Remove
            </ae-button-3>
          </li>
        </ae-dropdown>
        <ae-radio
          slot="right"
          :checked="network === currentNetwork"
          @change="setRPCUrl(network.url)"
        />
      </list-item>
      <list-item-button :to="{ name: 'settings-network-new' }">
        Connect to another node
      </list-item-button>
    </ae-card>
  </mobile-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import {
  AeDropdown, AeIcon, AeButton as AeButton3, directives,
} from '@aeternity/aepp-components-3';
import MobilePage from '../../components/mobile/Page.vue';
import AeCard from '../../components/AeCard.vue';
import ListItem from '../../components/ListItem.vue';
import ListItemButton from '../../components/ListItemButton.vue';
import AeRadio from '../../components/AeRadio.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    ListItem,
    ListItemButton,
    AeDropdown,
    AeIcon,
    AeButton3,
    AeRadio,
  },
  directives: {
    copyToClipboard: directives.copyToClipboard,
  },
  computed: mapGetters(['networks', 'currentNetwork']),
  methods: mapMutations(['setRPCUrl', 'removeNetwork']),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.settings-network {
  .ae-icon-more {
    font-size: rem(24px);
  }
}
</style>
