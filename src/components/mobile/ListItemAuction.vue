<template>
  <ListItem
    v-bind="$attrs"
    :title="name"
    :subtitle="subtitle"
    v-on="$listeners"
  >
    <AeIdenticon
      slot="icon"
      :address="info.lastBid.tx.accountId"
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
import blocksToRelativeTime from '../../filters/blocksToRelativeTime';
import ListItem from '../ListItem.vue';
import AeIdenticon from '../AeIdenticon.vue';

export default {
  components: { ListItem, AeIdenticon },
  props: {
    name: { type: String, required: true },
    info: { type: Object, required: true },
    subtitleLastBid: Boolean,
  },
  subscriptions() {
    const { convertAmount, topBlockHeight } = this.$store.state.observables;

    return {
      subtitle: this
        .$watchAsObservable(
          ({ subtitleLastBid, info }) => ({ subtitleLastBid, info }),
          { immediate: true },
        )
        .pipe(
          pluck('newValue'),
          switchMap(({ subtitleLastBid, info }) => (subtitleLastBid
            ? convertAmount(() => new BigNumber(info.lastBid.tx.nameFee).shiftedBy(-MAGNITUDE))
            : topBlockHeight.pipe(
              map((value) => `${this.$t('name.expiration')} ${blocksToRelativeTime(info.auctionEnd - value)}`),
            ))),
        ),
    };
  },
};
</script>
