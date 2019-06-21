<template>
  <MobilePage fill="neutral">
    <Guide>
      <em>Names</em>
    </Guide>

    <h2>Claim a name for your account!</h2>
    <p>Tap the “+” button below to claim a name and associate it with one of your accounts.</p>

    <h2>Registered Names</h2>
    <AeCard fill="maximum">
      <ListItemAccount
        v-for="account in accounts"
        :key="account.address"
        v-bind="account"
        subtitle="address"
      />
    </AeCard>

    <ButtonAddFixed :to="{ name: 'name-new' }" />
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import ButtonAddFixed from '../../components/ButtonAddFixed.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeCard,
    ListItemAccount,
    ButtonAddFixed,
  },
  computed: mapState('accounts', { accounts: 'list' }),
};
</script>
