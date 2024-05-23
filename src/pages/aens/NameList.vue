<template>
  <Page fill="neutral">
    <NameListHeader />

    <h2>{{ $t('name.list.personal-note') }}</h2>
    <p>{{ $t('name.list.personal-explanation') }}</p>

    <template v-if="owned.length">
      <h2>{{ $t('name.list.registered') }}</h2>
      <AeCard fill="maximum">
        <ListItemAccount
          v-for="entry in owned"
          :key="entry.name"
          :address="entry.owner"
          :name="entry.name"
          :to="{ name: 'name-details', params: { name: entry.name } }"
          subtitle="address"
        >
          <NamePending
            v-if="entry.status === 'pending'"
            slot="right"
          />
        </ListItemAccount>
      </AeCard>
    </template>

    <template v-if="auctions.length">
      <h2>{{ $t('name.list.active-auctions') }}</h2>
      <AeCard fill="maximum">
        <ListItemAccount
          v-for="auction in auctions"
          :key="auction.name"
          :name="auction.name"
          :balance="auction.nameFee"
          :address="auction.accountId"
          :to="{ name: 'auction-details', params: { name: auction.name } }"
        />
      </AeCard>
    </template>

    <ButtonAddFixed :to="{ name: 'name-new' }" />
  </Page>
</template>

<script>
import { mapState } from 'vuex';
import BigNumber from 'bignumber.js';
import Page from '../../components/Page.vue';
import NameListHeader from '../../components/mobile/NameListHeader.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import NamePending from '../../components/mobile/NamePending.vue';
import ButtonAddFixed from '../../components/ButtonAddFixed.vue';
import { fetchAuctions } from '../../lib/methods';
import { MAGNITUDE } from '../../lib/constants';

export default {
  components: {
    Page,
    NameListHeader,
    AeCard,
    ListItemAccount,
    NamePending,
    ButtonAddFixed,
  },
  data: () => ({ auctions: [] }),
  computed: mapState('names', ['owned']),
  async mounted() {
    const fetchNames = () => this.$store.dispatch('names/fetchOwned');
    await fetchNames();
    const nameInt = setInterval(fetchNames, 3000);
    this.$once('hook:destroyed', () => clearInterval(nameInt));

    await this.fetchUserAuctions();
    const auctionInt = setInterval(() => this.fetchUserAuctions(), 9000);
    this.$once('hook:destroyed', () => clearInterval(auctionInt));
  },
  methods: {
    fetchAuctions,
    async fetchUserAuctions() {
      const sdk = await Promise.resolve(this.$store.state.sdk);
      const addresses = this.$store.state.accounts.list.map(({ address }) => address);
      const [auctions, ...claims] = await Promise.all([
        new Promise((resolve) => {
          const acc = [];
          this.fetchAuctions((arr) => {
            if (!arr) resolve(acc);
            else acc.push(...arr);
          });
        }),
        ...addresses.map((account) => sdk
          .middleware2.api.getTxs({
            direction: 'backward', account, limit: 100, type: 'name_claim',
          })),
      ]);
      const claimIdxs = claims.map(({ data }) => data).flat(1).map(({ txIndex }) => txIndex);
      this.auctions = auctions
        .filter((a) => a.info.bids.some((txId) => claimIdxs.includes(txId)))
        .map((a) => ({
          name: a.name,
          accountId: a.info.lastBid.tx.accountId,
          nameFee: BigNumber(a.info.lastBid.tx.nameFee).shiftedBy(-MAGNITUDE),
        }));
    },
  },
};
</script>
