<template>
  <MobilePage
    class="settings-aepp-account-access"
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    title="Aepp account access"
    header-fill="light"
    fill="neutral"
  >
    <p>Manage which æpps can access your (sub)accounts</p>
    <AeCard fill="maximum">
      <ListItem
        v-for="app in apps"
        :key="app.name"
        :to="{ name: 'settings-aepp-access-control', params: { appHost: app.host } }"
        :subtitle="`can access ${app.permissions.accessToAccounts.length}
          account${app.permissions.accessToAccounts.length === 1 ? '' : 's'}`"
        :title="app.name"
      >
        <img
          slot="icon"
          :src="app.icon || DEFAULT_ICON"
          :alt="app.name"
        >
        <AeIcon
          slot="right"
          name="left-more"
        />
      </ListItem>
    </AeCard>
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import { get } from 'lodash-es';
import { AeIcon } from '@aeternity/aepp-components-3';
import MobilePage from '../../components/mobile/Page.vue';
import AeCard from '../../components/AeCard.vue';
import ListItem from '../../components/ListItem.vue';
import { DEFAULT_ICON } from '../../lib/appsRegistry';

export default {
  components: {
    MobilePage,
    AeCard,
    ListItem,
    AeIcon,
  },
  data: () => ({
    DEFAULT_ICON,
  }),
  computed: mapState({
    apps: ({ apps }, { getAppMetadata }) => apps
      .filter((app => get(app, 'permissions.accessToAccounts.length', 0)))
      .map(app => ({ ...app, ...getAppMetadata(app.host) })),
  }),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.settings-aepp-account-access {
  p {
    @extend %face-sans-s;
    margin-top: rem(30px);
    color: $color-neutral;
  }

  img {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: inherit;
  }
}
</style>
