<template>
  <Page class="app-list" fill="neutral">
    <Guide :template="$t('app.list.browse-guide')" />

    <UrlForm />

    <template v-if="bookmarkedApps.length">
      <Guide :template="$t('app.list.bookmarked-guide')" />

      <div class="shortcuts">
        <AppShortcut
          v-for="(app, idx) in bookmarkedApps"
          :key="`app-shortcut-${idx}`"
          v-bind="app"
          :to="`/browser/${app.host}`"
        />
      </div>
    </template>

    <Guide :template="$t('app.list.featured-guide')" />

    <AeCard fill="maximum">
      <ListItem
        v-for="(app, idx) in aeternityApps"
        :key="`list-item-${idx}`"
        :to="{ name: 'app-details', params: { host: app.host } }"
        :title="app.name"
        :subtitle="app.host"
      >
        <img v-if="app.icon" slot="icon" :src="app.icon" :alt="app.name" />
      </ListItem>
    </AeCard>
  </Page>
</template>

<script>
import { mapState } from 'vuex';
import appsRegistry from '../../lib/appsRegistry';
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import UrlForm from '../../components/mobile/UrlForm.vue';
import AppShortcut from '../../components/AppShortcut.vue';
import AeCard from '../../components/AeCard.vue';
import ListItem from '../../components/ListItem.vue';
import { LeftMore } from '../../components/icons';

export default {
  components: {
    Page,
    Guide,
    UrlForm,
    AppShortcut,
    AeCard,
    ListItem,
  },
  computed: mapState({
    aeternityApps: (state, getters) =>
      appsRegistry.map((host) => ({ ...getters['appsMetadata/get'](host), host })),
    bookmarkedApps: ({ apps }, getters) =>
      apps
        .filter(({ bookmarked }) => bookmarked)
        .map((app) => ({ ...app, ...getters['appsMetadata/get'](app.host) })),
  }),
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';

.app-list {
  .url-form {
    margin: functions.rem(24px) functions.rem(-16px);
    border-radius: functions.rem(4px);
    background-color: variables.$color-neutral-positive-3;
  }

  .shortcuts {
    margin: functions.rem(24px) functions.rem(-10px);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    grid-gap: 30px 10px;
    justify-items: center;
  }
}
</style>
