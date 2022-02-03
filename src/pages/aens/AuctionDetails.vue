<template>
  <Page
    header-fill="light"
    fill="neutral"
    left-button-icon-name="back"
    :left-button-to="{ name: 'name-list' }"
    :title="name"
  >
    <AeSpinner v-if="bids === null" />
    <h2 v-else-if="bids.length === 0">
      {{ $t('name.details.auction-not-found') }}
    </h2>
    <template v-else>
      <h2>
        {{ $t('name.expiration') }}
        {{ blocksToRelativeTime(auctionEnd - topBlockHeight) }}
      </h2>

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
            v-for="(bid, idx) in previousBids"
            :key="`${idx}-${bid.accountId}`"
            v-bind="bid"
            inactive
          />
        </AeCard>
      </template>
    </template>

    <ButtonAddFixed :to="{ name: 'auction-bid', params: { name } }" />
  </Page>
</template>

<script>
import BigNumber from 'bignumber.js';
import { pick } from 'lodash-es';
import blocksToRelativeTime from '../../filters/blocksToRelativeTime';
import Page from '../../components/Page.vue';
import AeSpinner from '../../components/AeSpinner.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemBid from '../../components/mobile/ListItemBid.vue';
import ButtonAddFixed from '../../components/ButtonAddFixed.vue';
import { MAGNITUDE } from '../../lib/constants';

export default {
  components: {
    Page,
    AeSpinner,
    AeCard,
    ListItemBid,
    ButtonAddFixed,
  },
  props: {
    name: { type: String, required: true },
  },
  data: () => ({
    auctionEnd: 0,
    bids: null,
  }),
  computed: {
    currentBid() {
      return this.bids?.[0];
    },
    previousBids() {
      return this.bids?.slice(1);
    },
  },
  subscriptions() {
    return pick(this.$store.state.observables, ['topBlockHeight']);
  },
  mounted() {
    const id = setInterval(() => this.updateAuctionEntry(), 3000);
    this.$once('hook:destroyed', () => clearInterval(id));
    this.$watch(
      ({ name }) => name,
      () => this.updateAuctionEntry(),
      { immediate: true },
    );
  },
  methods: {
    async updateAuctionEntry() {
      const sdk = await Promise.resolve(this.$store.state.sdk);
      const res = await sdk.middlewareNew.api.getNameById(this.name);
      const { auctionEnd, bids } = res.auction || res.info;
      this.auctionEnd = auctionEnd;
      this.bids = await Promise.all(bids.map(async (txId) => {
        const { tx } = await sdk.middlewareNew.api.getTxByIndex(txId);
        return {
          nameFee: new BigNumber(tx.nameFee).shiftedBy(-MAGNITUDE),
          accountId: tx.accountId,
        };
      }));
    },
    blocksToRelativeTime,
  },
};
</script>
