<template>
  <MobilePage
    class="settings-aepp-access-control"
    :left-button-to="{ name: 'settings-aepp-account-access' }"
    left-button-icon-name="back"
    :title="app.name"
    header-fill="light"
    fill="neutral"
  >
    <DetailsPermission name="Address">
      This aepp asks for access your public address.
    </DetailsPermission>

    <DetailsPermission name="Transactions">
      Drone Project involves an auction.
      The æpp will prepare a transaction, you are in charge of confirming it.
    </DetailsPermission>

    <AeCard fill="maximum">
      <ListItemAccount
        v-for="account in accounts"
        :key="account.address"
        v-bind="account"
        :subtitle="account.address"
      >
        <AeRadio
          slot="right"
          checkbox
          :checked="app.permissions.accessToAccounts.includes(account.address)"
          @change="toggleAccessToAccount({ appHost, accountAddress: account.address })"
        />
      </ListItemAccount>
    </AeCard>
  </MobilePage>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import AeCard from '../../components/AeCard.vue';
import DetailsPermission from '../../components/mobile/DetailsPermission.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import AeRadio from '../../components/AeRadio.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    DetailsPermission,
    ListItemAccount,
    AeRadio,
  },
  props: {
    appHost: { type: String, required: true },
  },
  computed: mapState({
    accounts: ({ accounts: { list } }) => list,
    app(state, { getApp, getAppMetadata }) {
      return { ...getApp(this.appHost), ...getAppMetadata(this.appHost) };
    },
  }),
  methods: mapMutations(['toggleAccessToAccount']),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.settings-aepp-access-control {
  .details-permission {
    --color-primary: #{$color-neutral-negative-3};
    --color-secondary: #{$color-neutral};
  }
}
</style>
