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
import { mapState, mapGetters } from 'vuex';
import ListItem from './ListItem.vue';
import AeIdenticon from './AeIdenticon.vue';
import prefixedAmount from '../filters/prefixedAmount';
import formatAddress from '../filters/formatAddress';
import currencyAmount from '../filters/currencyAmount';
import toCurrency from '../filters/toCurrency';

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
          if (!this.balance) return '';
          return this.swapped ? currencyAmount(
            toCurrency(this.balance, this.rate),
            this.active,
          ) : `${prefixedAmount(this.balance)} AE`;
        case 'address':
          return formatAddress(this.address);
        default:
          return this.subtitle;
      }
    },
    ...mapState('accounts', {
      nameFromStore(state, { getName }) { return getName(this); },
    }),
    ...mapState('currencies', ['swapped']),
    ...mapGetters('currencies', ['active']),
  },
  subscriptions() {
    return { rate: this.$store.state.observables.rate };
  },
};
</script>
