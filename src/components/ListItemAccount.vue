<template>
  <ListItem
    v-bind="$attrs"
    :title="name"
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

export default {
  components: { ListItem, AeIdenticon },
  props: {
    address: { type: String, required: true },
    balance: { type: BigNumber, default: null },
    source: { type: Object, required: true },
    subtitle: { type: String, default: 'balance' },
  },
  computed: {
    subtitleContent() {
      switch (this.subtitle) {
        case 'balance':
          return this.balance ? `${prefixedAmount(this.balance)} AE` : '';
        case 'address':
          return `${this.address.slice(0, 6)}···${this.address.slice(-3)}`;
        default:
          return this.subtitle;
      }
    },
    ...mapState('accounts', {
      name(state, { getName }) { return getName(this); },
    }),
  },
};
</script>
