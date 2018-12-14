<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'settings' }"
    title="Network"
    back-button
    class="settings-network"
  >
    <ae-card>
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
      <ae-button
        :to="{ name: 'settings-network-new' }"
        plain
      >
        Connect to another node
      </ae-button>
    </ae-card>
  </mobile-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import {
  AeDropdown, AeIcon, AeButton as AeButton3, directives,
} from '@aeternity/aepp-components-3';
import MobilePage from '../components/MobilePage.vue';
import AeCard from '../components/AeCard.vue';
import ListItem from '../components/ListItem.vue';
import AeRadio from '../components/AeRadio.vue';
import AeButton from '../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    ListItem,
    AeDropdown,
    AeIcon,
    AeButton3,
    AeRadio,
    AeButton,
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
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.settings-network {
  background-color: $color-neutral-positive-2;

  .ae-icon-more {
    font-size: rem(24px);
  }

  .ae-button._plain {
    display: block;
    height: rem(44px);
    line-height: rem(44px);
    font-size: rem(11px);
    color: $color-neutral-negative-1;
  }
}
</style>

<style lang="scss" src="./SettingsNetwork.scss" scoped />
