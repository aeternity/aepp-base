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
        {{ blocksToRelativeTime(endsAt - topBlockHeight) }}
      </h2>

      <h2>{{ $t('name.details.current-bid') }}</h2>
      <AeCard fill="maximum">
        <ListItemBid v-bind="currentBid" inactive />
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
import { produceNameId } from '@aeternity/aepp-sdk';
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
    endsAt: 0,
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
    async updateEndsAt() {
      this.endsAt = (await this.$store.getters.node.getAuctionEntryByName(this.name)).endsAt;
    },
    async updateBids() {
      const { data } = await this.$store.getters.middleware
        // TODO: show more than 100 bids
        // TODO: use /v3/names/auction.chain/claims instead
        // TODO: remove previous bids after solving https://github.com/aeternity/ae_mdw/issues/2097
        .getAccountActivities(produceNameId(this.name), { limit: 100 });
      this.bids = data
        .filter(({ type }) => type === 'NameClaimEvent')
        .filter(({ payload: { sourceTxType } }) => sourceTxType === 'NameClaimTx')
        .map(
          ({
            payload: {
              tx: { accountId, nameFee },
            },
          }) => ({
            nameFee: new BigNumber(nameFee).shiftedBy(-MAGNITUDE),
            accountId,
          }),
        );
    },
    async updateAuctionEntry() {
      await Promise.all([this.updateEndsAt(), this.updateBids()]);
    },
    blocksToRelativeTime,
  },
};
</script>
