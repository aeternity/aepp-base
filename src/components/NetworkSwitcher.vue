<template>
  <div class="network-switcher">
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
    <list-item-button
      :to="networkAddButtonTo"
      @click="$emit('network-add-button-click')"
    >
      Connect to another node
    </list-item-button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import {
  AeDropdown, AeIcon, AeButton as AeButton3, directives,
} from '@aeternity/aepp-components-3';
import ListItem from './ListItem.vue';
import ListItemButton from './ListItemButton.vue';
import AeRadio from './AeRadio.vue';

export default {
  components: {
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
  props: {
    networkAddButtonTo: { type: [Object, String], default: null },
  },
  computed: mapGetters(['networks', 'currentNetwork']),
  methods: {
    ...mapMutations(['removeNetwork']),
    setRPCUrl(rpcUrl) {
      this.$store.commit('setRPCUrl', rpcUrl);
      this.$emit('switch');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.network-switcher {
  .ae-icon-more {
    font-size: rem(24px);
  }
}
</style>
