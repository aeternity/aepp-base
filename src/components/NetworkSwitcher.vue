<template>
  <div class="network-switcher">
    <ListItem
      v-for="(network, idx) in networks"
      :key="network.url"
      :title="network.name"
      :subtitle="network.url"
    >
      <div
        v-if="network.custom"
        slot="icon"
        :ref="`button-${idx}`"
        @click="menuForNetworkIdx = idx"
      >
        <More />
      </div>
      <AeRadio
        slot="right"
        :checked="network === currentNetwork"
        @change="setSdkUrl(network.url)"
      />
    </ListItem>
    <ListItemButton
      :to="networkAddButtonTo"
      @click="$emit('network-add-button-click')"
    >
      {{ $t('network.settings.new.title') }}
    </ListItemButton>

    <AeMenu
      v-if="menuForNetworkIdx !== -1"
      :anchor="$refs[`button-${menuForNetworkIdx}`][0]"
      @close="menuForNetworkIdx = -1"
    >
      <AeMenuItem v-copy-on-click="networks[menuForNetworkIdx].url">
        <Copy />{{ $t('network.settings.list.copy-link') }}
      </AeMenuItem>
      <AeMenuItem @click="removeNetwork">
        <Close />{{ $t('network.settings.list.remove') }}
      </AeMenuItem>
    </AeMenu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import copyOnClick from '../directives/copyOnClick';
import ListItem from './ListItem.vue';
import ListItemButton from './ListItemButton.vue';
import { More, Copy, Close } from './icons';
import AeRadio from './AeRadio.vue';
import AeMenu from './AeMenu.vue';
import AeMenuItem from './AeMenuItem.vue';

export default {
  components: {
    ListItem,
    ListItemButton,
    More,
    AeRadio,
    AeMenu,
    AeMenuItem,
    Copy,
    Close,
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
    setSdkUrl(sdkUrl) {
      this.$store.commit('setSdkUrl', sdkUrl);
      this.$emit('switch');
    },
    removeNetwork() {
      if (this.networks[this.menuForNetworkIdx] === this.currentNetwork) {
        this.$store.commit('setSdkUrl', this.networks[0].url);
      }
      this.$store.commit('removeNetwork', this.menuForNetworkIdx);
      this.menuForNetworkIdx = -1;
    },
  },
};
</script>
