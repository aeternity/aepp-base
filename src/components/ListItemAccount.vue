<template>
  <ListItem
    v-bind="$attrs"
    :title="name || nameFromStore"
    :subtitle="subtitleContent"
    subtitle-monospace
    v-on="$listeners"
  >
    <AeIdenticon
      slot="icon"
      :address="address"
    />
    <slot
      v-for="slot in Object.keys($slots)"
      :slot="slot"
      :name="slot"
    />
  </ListItem>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapState } from 'vuex';
import ListItem from './ListItem.vue';
import AeIdenticon from './AeIdenticon.vue';
import prefixedAmount from '../filters/prefixedAmount';
import formatAddress from '../filters/formatAddress';

export default {
  components: { ListItem, AeIdenticon },
  props: {
    name: { type: String, default: '' },
    address: { type: String, required: true },
    balance: { type: BigNumber, default: null },
    source: { type: Object, default: () => {} },
    subtitle: { type: String, default: 'balance' },
  },
  computed: {
    subtitleContent() {
      switch (this.subtitle) {
        case 'balance':
          return this.balance ? `${prefixedAmount(this.balance)} AE` : '';
        case 'address':
          return formatAddress(this.address);
        default:
          return this.subtitle;
      }
    },
    ...mapState('accounts', {
      nameFromStore(state, { getName }) { return getName(this); },
    }),
  },
};
</script>
