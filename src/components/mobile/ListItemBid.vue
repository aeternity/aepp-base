<template>
  <ListItem
    v-bind="$attrs"
    :title="formatedNameFee"
    :subtitle="name || formatAddress(accountId)"
    :subtitle-monospace="!name"
    v-on="$listeners"
  >
    <AeIdenticon
      slot="icon"
      :address="accountId"
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
import formatAddress from '../../filters/formatAddress';
import ListItem from '../ListItem.vue';
import AeIdenticon from '../AeIdenticon.vue';

export default {
  components: { ListItem, AeIdenticon },
  props: {
    nameFee: { type: BigNumber, required: true },
    accountId: { type: String, required: true },
  },
  computed: mapState('names', {
    name(state, { get }) { return get(this.accountId); },
  }),
  subscriptions() {
    return {
      formatedNameFee: this
        .$watchAsObservable(({ nameFee }) => nameFee, { immediate: true })
        .pipe(
          pluck('newValue'),
          switchMap(nameFee => this.$store.state.observables.convertAmount(() => nameFee)),
        ),
    };
  },
  methods: { formatAddress },
};
</script>
