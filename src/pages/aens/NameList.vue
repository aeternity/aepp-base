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
        />
      </AeCard>
    </template>

    <template v-if="auctions.length">
      <h2>{{ $t('name.list.active-auctions') }}</h2>
      <AeCard fill="maximum">
        <ListItemAccount
          v-for="auction in auctions"
          :key="auction.name"
          :name="auction.name"
          :balance="auction.highestBid"
          :address="auction.highestBidder"
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
import { uniq } from 'lodash-es';
import { isNameValid, isAuctionName, Node } from '@aeternity/aepp-sdk';
import Page from '../../components/Page.vue';
import NameListHeader from '../../components/mobile/NameListHeader.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import ButtonAddFixed from '../../components/ButtonAddFixed.vue';
import { MAGNITUDE } from '../../lib/constants';

export default {
  components: {
    Page,
    NameListHeader,
    AeCard,
    ListItemAccount,
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
    async fetchUserAuctions() {
      const addresses = this.$store.state.accounts.list.map(({ address }) => address);
      // TODO: refactor after solving https://github.com/aeternity/ae_mdw/issues/1667
      const claims = await Promise.all(
        addresses.map((account) =>
          this.$store.getters.middleware.getTransactions({
            direction: 'backward',
            account,
            limit: 100,
            type: ['name_claim'],
          }),
        ),
      );
      const height = await this.$store.getters.sdk.getHeight({ cached: true });
      const recentlyClaimedNames = uniq(
        claims
          .map(({ data }) => data)
          .flat()
          // max auction length is 29760 blocks, but it can be increased multiple times by 120
          .filter(({ blockHeight }) => blockHeight > height - 40000)
          .map(({ tx: { name } }) => name.toLowerCase())
          .filter((name) => isNameValid(name) && isAuctionName(name)),
      );
      this.auctions = (
        await Promise.allSettled(
          recentlyClaimedNames.map((name) =>
            this.$store.getters.node
              .getAuctionEntryByName(name)
              .then((entry) => ({ ...entry, name })),
          ),
        )
      )
        .filter(({ status }) => status === 'fulfilled')
        .map(({ value: { name, highestBidder, highestBid } }) => ({
          name,
          highestBidder,
          highestBid: BigNumber(highestBid).shiftedBy(-MAGNITUDE),
        }));
    },
  },
};
</script>
