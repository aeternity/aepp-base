<template>
  <MobilePage
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    :title="$t('app.settings.title')"
    header-fill="light"
    fill="neutral"
  >
    <p>{{ $t('app.settings.list.note') }}</p>

    <AeCard fill="maximum">
      <ListItem
        v-for="app in apps"
        :key="app.host"
        :to="{ name: 'settings-app-details', params: { appHost: app.host } }"
        :title="app.name"
        :subtitle="app.subtitle"
      >
        <img
          slot="icon"
          :src="app.icon"
          :alt="app.name"
        >
        <LeftMore slot="right" />
      </ListItem>
    </AeCard>
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import { get } from 'lodash-es';
import MobilePage from '../../components/mobile/Page.vue';
import AeCard from '../../components/AeCard.vue';
import ListItem from '../../components/ListItem.vue';
import { LeftMore } from '../../components/icons';
import { DEFAULT_ICON } from '../../lib/appsRegistry';

export default {
  components: {
    MobilePage,
    AeCard,
    ListItem,
    LeftMore,
  },
  computed: mapState({
    apps({ apps }, { getAppMetadata }) {
      return apps
        .filter(app => get(app, 'permissions.accessToAccounts.length', 0))
        .map((app) => {
          const c = app.permissions.accessToAccounts.length;
          return {
            icon: DEFAULT_ICON,
            ...app,
            ...getAppMetadata(app.host),
            subtitle: this.$tc('app.settings.list.subtitle', c),
          };
        });
    },
  }),
};
</script>
