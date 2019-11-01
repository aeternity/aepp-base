<template>
  <MobilePage
    header-fill="light"
    fill="neutral"
    left-button-icon-name="back"
    :left-button-to="previousRoute || { name: 'name-list', params: { view: 'ending-soonest' } }"
    :title="name"
  >
    <AeLoader v-if="bids === null" />
    <h2 v-else-if="bids.length === 0">
      {{ $t('name.details.auction-not-found') }}
    </h2>
    <template v-else>
      <h2>
        {{ $t('name.expiration') }}
        {{ blocksToRelativeTime(expiration - topBlockHeight) }}
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
  </MobilePage>
</template>

<script>
import { pick } from 'lodash-es';
import blocksToRelativeTime from '../../filters/blocksToRelativeTime';
import MobilePage from '../../components/mobile/Page.vue';
import AeLoader from '../../components/AeLoader.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemBid from '../../components/mobile/ListItemBid.vue';
import ButtonAddFixed from '../../components/ButtonAddFixed.vue';

export default {
  components: {
    MobilePage,
    AeLoader,
    AeCard,
    ListItemBid,
    ButtonAddFixed,
  },
  props: {
    name: { type: String, required: true },
  },
  data: () => ({
    expiration: 0,
    bids: null,
    previousRoute: null,
  }),
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
      const res = await this.$store.dispatch('names/fetchAuctionEntry', this.name);
      this.expiration = res.expiration;
      this.bids = res.bids;
    },
    blocksToRelativeTime,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!['login', 'auction-bid', 'auction-bid-amount'].includes(from.name)) {
        vm.previousRoute = from.path; // eslint-disable-line no-param-reassign
      }
    });
  },
};
</script>
