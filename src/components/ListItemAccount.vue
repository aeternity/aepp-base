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
import { pluck, switchMap } from 'rxjs/operators';
import ListItem from './ListItem.vue';
import AeIdenticon from './AeIdenticon.vue';
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
          return this.convertedBalance;
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
  subscriptions() {
    return {
      convertedBalance: this
        .$watchAsObservable(() => this.balance && this.subtitle === 'balance', { immediate: true })
        .pipe(
          pluck('newValue'),
          switchMap((shouldSubscribe) => (shouldSubscribe
            ? this.$store.state.observables.convertAmount(() => this.balance)
            : Promise.resolve(''))),
        ),
    };
  },
};
</script>
