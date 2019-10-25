<template>
  <MobilePage fill="neutral">
    <Guide>
      <em>{{ name }}</em>
    </Guide>

    <AeLoader v-if="bids === null" />
    <h2 v-else-if="bids.length === 0">
      {{ $t('name.details.auction-not-found') }}
    </h2>
    <template v-else>
      <h2>{{ $t('name.details.current-bid') }}</h2>
      <AeCard fill="maximum">
        <ListItemBid
          v-bind="currentBid"
          inactive
        />
      </AeCard>

      <template v-if="previousBids.length">
        <h2>{{ $t('name.details.previous-bids') }}</h2>
        <AeCard fill="maximum">
          <ListItemBid
            v-for="bid in previousBids"
            :key="bid.accountId"
            v-bind="bid"
            inactive
          />
        </AeCard>
      </template>
    </template>

    <ButtonAddFixed :to="{ name: 'name-new' }" />
  </MobilePage>
</template>

<script>
import BigNumber from 'bignumber.js';
import { MAGNITUDE } from '../../lib/constants';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeLoader from '../../components/AeLoader.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemBid from '../../components/mobile/ListItemBid.vue';
import ButtonAddFixed from '../../components/ButtonAddFixed.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeLoader,
    AeCard,
    ListItemBid,
    ButtonAddFixed,
  },
  props: {
    name: { type: String, required: true },
  },
  data: () => ({ bids: null }),
  computed: {
    currentBid() {
      if (!this.bids) return null;
      return this.bids.reduce((a, b) => (a.nameFee.isGreaterThan(b.nameFee) ? a : b));
    },
    previousBids() {
      if (!this.bids) return null;
      return this.bids.filter(bid => bid !== this.currentBid);
    },
  },
  watch: {
    name: {
      async handler() {
        this.bids = null;
        if (this.$store.state.sdk.then) await this.$store.state.sdk;
        this.bids = (await this.$store.state.sdk.middleware.getNameAuctionsBidsbyName(this.name))
          .map(({ tx }) => ({
            ...tx,
            nameFee: BigNumber(tx.nameFee).shiftedBy(-MAGNITUDE),
          }));
      },
      immediate: true,
    },
  },
};
</script>
