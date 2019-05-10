<template>
  <ListItem
    v-bind="$attrs"
    :title="name"
    :subtitle="subtitle || balance && (prefixedAmount(balance) + ' AE')"
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
import ListItem from './ListItem.vue';
import AeIdenticon from './AeIdenticon.vue';
import prefixedAmount from '../filters/prefixedAmount';

export default {
  components: { ListItem, AeIdenticon },
  props: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    balance: { type: BigNumber, required: false, default: null },
    subtitle: { type: String, required: false, default: '' },
  },
  methods: { prefixedAmount },
};
</script>
