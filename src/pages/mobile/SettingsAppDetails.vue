<template>
  <MobilePage
    class="settings-app-details"
    :left-button-to="{ name: 'settings-app-list' }"
    left-button-icon-name="back"
    :title="app.name"
    header-fill="light"
    fill="neutral"
  >
    <DetailsAccountAccessPermission :app-name="app.name" />

    <AeCard fill="maximum">
      <ListItemAccount
        v-for="account in accounts"
        :key="account.address"
        v-bind="account"
        subtitle="address"
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
import DetailsAccountAccessPermission from '../../components/mobile/DetailsAccountAccessPermission.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import AeRadio from '../../components/AeRadio.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    DetailsAccountAccessPermission,
    ListItemAccount,
    AeRadio,
  },
  props: {
    appHost: { type: String, required: true },
  },
  computed: mapState({
    accounts: ({ accounts: { list } }) => list,
    app(state, { getApp, 'appsMetadata/get': getAppMetadata }) {
      return { ...getApp(this.appHost), ...getAppMetadata(this.appHost) };
    },
  }),
  methods: mapMutations(['toggleAccessToAccount']),
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.settings-app-details .details-account-access-permission {
  --color-primary: #{$color-neutral-negative-3};
  --color-secondary: #{$color-neutral};

  >>> .details-permission:first-child {
    border-top: none;
  }
}
</style>
