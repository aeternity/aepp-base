<template>
  <ListItem
    v-bind="$attrs"
    :title="name"
    :subtitle="subtitle"
    v-on="$listeners"
  >
    <AeIdenticon
      slot="icon"
      :address="winningBidder"
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
import { pluck, switchMap, map } from 'rxjs/operators';
import { MAGNITUDE } from '../../lib/constants';
import ListItem from '../ListItem.vue';
import AeIdenticon from '../AeIdenticon.vue';

export default {
  components: { ListItem, AeIdenticon },
  props: {
    name: { type: String, required: true },
    winningBidder: { type: String, required: true },
    winningBid: { type: String, required: true },
    expiration: { type: Number, required: true },
    subtitleWinningBid: Boolean,
  },
  subscriptions() {
    const { convertAmount, topBlockHeight } = this.$store.state.observables;

    return {
      subtitle: this
        .$watchAsObservable(
          ({ subtitleWinningBid, winningBid, expiration }) => ({
            subtitleWinningBid, ...subtitleWinningBid ? { winningBid } : { expiration },
          }),
          { immediate: true },
        )
        .pipe(
          pluck('newValue'),
          switchMap(({ subtitleWinningBid, winningBid, expiration }) => (subtitleWinningBid
            ? convertAmount(() => BigNumber(winningBid).shiftedBy(-MAGNITUDE))
            : topBlockHeight.pipe(
              map(value => this.$tc('name.expiration', expiration - value)),
            ))),
        ),
    };
  },
};
</script>
y
