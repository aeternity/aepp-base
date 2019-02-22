<template>
  <div class="network-switcher">
    <ListItem
      v-for="network in networks"
      :key="network.url"
      :title="network.name"
      :subtitle="network.url"
    >
      <AeDropdown
        v-if="network.custom"
        slot="icon"
        direction="left"
      >
        <AeIcon
          slot="button"
          name="more"
        />
        <li>
          <AeButton3 v-copy-on-click="network.url">
            <AeIcon name="copy" />Copy link
          </AeButton3>
        </li>
        <li>
          <AeButton3 @click="removeNetwork">
            <AeIcon name="close" />Remove
          </AeButton3>
        </li>
      </AeDropdown>
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { AeDropdown, AeIcon, AeButton as AeButton3 } from '@aeternity/aepp-components-3';
import copyOnClick from '../directives/copyOnClick';
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
    copyOnClick,
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
