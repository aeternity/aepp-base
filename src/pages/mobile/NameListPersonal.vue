<template>
  <MobilePage fill="neutral">
    <NameListHeader />

    <h2>{{ $t('name.list.personal-note') }}</h2>
    <p>{{ $t('name.list.personal-explanation') }}</p>

    <template v-if="owned.length">
      <h2>{{ $t('name.list.registered') }}</h2>
      <AeCard fill="maximum">
        <ListItemAccount
          v-for="name in owned"
          :key="`${name.name}-${name.id}`"
          :address="name.owner"
          :name="name.name"
          :to="{ name: 'name-details', params: { name: name.name } }"
          subtitle="address"
        >
          <NamePending
            v-if="name.pending"
            slot="right"
          />
        </ListItemAccount>
      </AeCard>
    </template>

    <ButtonAddFixed :to="{ name: 'name-new' }" />
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import NameListHeader from '../../components/mobile/NameListHeader.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import NamePending from '../../components/mobile/NamePending.vue';
import ButtonAddFixed from '../../components/ButtonAddFixed.vue';

export default {
  components: {
    MobilePage,
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
