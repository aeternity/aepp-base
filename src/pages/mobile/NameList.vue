<template>
  <MobilePage fill="neutral">
    <Guide>
      <em>Names</em>
    </Guide>

    <h2>Claim a name for your account!</h2>
    <p>Tap the “+” button below to claim a name and associate it with one of your accounts.</p>

    <template v-if="owned.length">
      <h2>Registered Names</h2>
      <AeCard fill="maximum">
        <ListItemAccount
          v-for="name in owned"
          :key="`${name.name}-${name.id}`"
          :address="name.owner"
          :name="name.name"
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
import Guide from '../../components/Guide.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import NamePending from '../../components/mobile/NamePending.vue';
import ButtonAddFixed from '../../components/ButtonAddFixed.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeCard,
    ListItemAccount,
    NamePending,
    ButtonAddFixed,
  },
  computed: mapState('names', ['owned']),
  async mounted() {
    await this.$store.dispatch('intros/names');
    const update = () => this.$store.dispatch('names/fetchOwned');
    await update();
    const id = setInterval(update, 3000);
    this.$once('hook:destroyed', () => clearInterval(id));
  },
};
</script>
