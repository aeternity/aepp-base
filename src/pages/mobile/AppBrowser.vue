<template>
  <Page
    class="app-browser"
    fill="neutral"
  >
    <template v-if="bookmarkedApps.length">
      <Guide :template="$t('app.list.bookmarked-guide')" />

      <AeCard fill="maximum">
        <ListItem
          v-for="app in bookmarkedApps"
          :key="app.host"
          :title="app.name"
          :subtitle="app.host"
          :to="`/browser/${app.host}`"
        >
          <img
            v-if="app.icon"
            slot="icon"
            :src="app.icon"
            :alt="app.name"
          >
          <LeftMore slot="right" />
        </ListItem>
      </AeCard>
    </template>

    <Guide :template="$t('app.list.featured-guide')" />

    <AeCard fill="maximum">
      <ListItem
        v-for="app in aeternityApps"
        :key="app.host"
        :title="app.name"
        :subtitle="app.host"
        :to="`/browser/${app.host}`"
      >
        <img
          v-if="app.icon"
          slot="icon"
          :src="app.icon"
          :alt="app.name"
        >
        <LeftMore slot="right" />
      </ListItem>
    </AeCard>
  </Page>
</template>

<script>
import { mapState } from 'vuex';
import { LeftMore } from '../../components/icons';
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import AeCard from '../../components/AeCard.vue';
import ListItem from '../../components/ListItem.vue';
import aeternityApps from '../../lib/aeternity-apps.json';

export default {
  components: {
    Page, Guide, AeCard, ListItem, LeftMore,
  },
  computed: mapState({
    bookmarkedApps: ({ apps }, getters) => apps
      // TODO: check why host is a URL
      .map(({ host }) => new URL(host).host)
      .map((host) => getters['appsMetadata/get'](host)),
    aeternityApps: (state, getters) => aeternityApps
      .map((host) => getters['appsMetadata/get'](host)),
  }),
};
</script>

<style lang="scss" scoped>
@use '../../styles/functions';

.app-browser {
  .ae-card {
    margin-bottom: functions.rem(24px);
  }
}
</style>
