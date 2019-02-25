<template>
  <div class="network-switcher">
    <ListItem
      v-for="(network, idx) in networks"
      :key="network.url"
      :title="network.name"
      :subtitle="network.url"
    >
      <ButtonPlain
        v-if="network.custom"
        slot="icon"
        :ref="`button-${idx}`"
        @click="menuForNetworkIdx = idx"
      >
        <AeIcon name="more" />
      </ButtonPlain>
      <AeRadio
        slot="right"
        :checked="network === currentNetwork"
        @change="setRPCUrl(network.url)"
      />
    </ListItem>
    <ListItemButton
      :to="networkAddButtonTo"
      @click="$emit('network-add-button-click')"
    >
      Connect to another node
    </ListItemButton>

    <Menu
      v-if="menuForNetworkIdx !== -1"
      :anchor="$refs[`button-${menuForNetworkIdx}`][0]"
      @close="menuForNetworkIdx = -1"
    >
      <MenuItem v-copy-on-click="networks[menuForNetworkIdx].url">
        <AeIcon name="copy" />Copy link
      </MenuItem>
      <MenuItem @click="() => removeNetwork(menuForNetworkIdx)">
        <AeIcon name="close" />Remove
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import copyOnClick from '../directives/copyOnClick';
import ListItem from './ListItem.vue';
import ListItemButton from './ListItemButton.vue';
import ButtonPlain from './ButtonPlain.vue';
import AeRadio from './AeRadio.vue';
import Menu from './Menu.vue';
import MenuItem from './MenuItem.vue';

export default {
  components: {
    ListItem,
    ListItemButton,
    ButtonPlain,
    AeIcon,
    AeRadio,
    Menu,
    MenuItem,
  },
  directives: {
    copyOnClick,
  },
  props: {
    networkAddButtonTo: { type: [Object, String], default: null },
  },
  data: () => ({ menuForNetworkIdx: -1 }),
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
