<template>
  <Page fill="neutral">
    <NameListHeader />

    <h2>{{ $t('name.list.personal-note') }}</h2>
    <p>{{ $t('name.list.personal-explanation') }}</p>

    <template v-if="owned && owned.names.length">
      <h2>{{ $t('name.list.registered') }}</h2>
      <AeCard fill="maximum">
        <ListItemAccount
          v-for="entry in owned.names"
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

    <template v-if="owned && owned.bids.length">
      <h2>{{ $t('name.list.active-bids') }}</h2>
      <AeCard fill="maximum">
        <ListItemAccount
          v-for="bid in owned.bids"
          :key="bid.name"
          :name="bid.name"
          :balance="bid.nameFee"
          :address="bid.owner"
          :to="{ name: 'auction-details', params: { name: bid.name } }"
        />
      </AeCard>
    </template>

    <ButtonAddFixed :to="{ name: 'name-new' }" />
  </Page>
</template>

<script>
import { mapState } from 'vuex';
import Page from '../../components/Page.vue';
import NameListHeader from '../../components/mobile/NameListHeader.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import NamePending from '../../components/mobile/NamePending.vue';
import ButtonAddFixed from '../../components/ButtonAddFixed.vue';

export default {
  components: {
    Page,
    NameListHeader,
    AeCard,
    ListItemAccount,
    NamePending,
    ButtonAddFixed,
  },
  computed: mapState('names', ['owned']),
  async mounted() {
    const update = () => this.$store.dispatch('names/fetchOwned');
    await update();
    const id = setInterval(update, 3000);
    this.$once('hook:destroyed', () => clearInterval(id));
  },
};
</script>
