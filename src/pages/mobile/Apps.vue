<template>
  <MobilePage
    class="apps"
    fill="neutral"
  >
    <Guide><em>Featured æpps</em></Guide>

    <AeCard fill="maximum">
      <template v-for="(app, idx) in aeternityApps">
        <ListItem
          :key="`list-item-aeternity-app-${idx}`"
          :to="`/browser/${app.path}`"
          :title="app.name"
          :subtitle="app.path"
        >
          <img
            slot="icon"
            :src="app.icon"
            :alt="app.name"
          >
        </ListItem>
        <p
          :key="idx"
          class="app-description"
        >
          {{ app.description }}
        </p>
      </template>
    </AeCard>

    <Guide>Browse æpps</Guide>

    <UrlForm @input="searchTerm = $event" />

    <template v-if="bookmarkedApps.length">
      <Guide>My æpps</Guide>

      <div class="shortcuts">
        <AppShortcut
          v-for="(app, idx) in bookmarkedAppsToShow"
          :key="`app-shortcut-aeternity-app-${idx}`"
          v-bind="app"
          :to="`/browser/${app.host}`"
        />
      </div>
    </template>
  </MobilePage>
</template>

<script>
import Fuse from 'fuse.js';
import { mapState } from 'vuex';
import { aeternityApps } from '../../lib/appsRegistry';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import UrlForm from '../../components/mobile/UrlForm.vue';
import AppShortcut from '../../components/AppShortcut.vue';
import AeCard from '../../components/AeCard.vue';
import ListItem from '../../components/ListItem.vue';

export default {
  components: {
    MobilePage,
    Guide,
    UrlForm,
    AppShortcut,
    AeCard,
    ListItem,
  },
  data: () => ({
    aeternityApps,
    searchTerm: '',
  }),
  computed: {
    ...mapState({
      bookmarkedApps: ({ apps }, { getAppMetadata }) => apps
        .filter(({ bookmarked }) => bookmarked)
        .map(app => ({ ...app, ...getAppMetadata(app.host) })),
    }),
    fuse() {
      return new Fuse(this.bookmarkedApps, {
        tokenize: true,
        matchAllTokens: true,
        keys: ['name', 'host'],
      });
    },
    bookmarkedAppsToShow() {
      return this.searchTerm ? this.fuse.search(this.searchTerm) : this.bookmarkedApps;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.apps {
  .url-form {
    margin: rem(24px) rem(-16px);
    border-radius: rem(4px);
    background-color: $color-neutral-positive-3;
  }

  .shortcuts {
    margin: rem(20px) rem(-10px);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    grid-gap: 30px 10px;
    justify-items: center;
  }

  .ae-card {
    margin-bottom: rem(24px);
  }

  .app-description {
    padding-bottom: rem(16px);
    margin: 0 rem(16px);
    border-bottom: 2px solid $color-neutral-positive-2;
    @extend %face-sans-s;
    color: $color-neutral-negative-3;

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
