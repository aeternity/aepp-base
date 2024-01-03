<template>
  <div class="apps">
    <template v-if="bookmarkedApps.length">
      <Guide
        :template="$t('app.list.bookmarked-guide')"
        size="big"
      />

      <div class="shortcuts">
        <AppShortcut
          v-for="app in bookmarkedApps"
          :key="app.host"
          v-bind="app"
          :to="app.url"
        />
      </div>
    </template>

    <Guide
      :template="$t('app.list.guide')"
      size="big"
    />

    <Note>
      {{ $t('app.list.note') }}
    </Note>

    <div class="shortcuts">
      <AppShortcut
        v-for="app in aeternityApps"
        :key="app.host"
        v-bind="app"
        :to="app.url"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Guide from '../../components/Guide.vue';
import Note from '../../components/Note.vue';
import AppShortcut from '../../components/AppShortcut.vue';
import aeternityApps from '../../lib/aeternity-apps.json';

export default {
  components: { Guide, Note, AppShortcut },
  computed: mapState({
    bookmarkedApps: ({ apps }, getters) => apps
      // TODO: check why host is a URL
      .map(({ host }) => new URL(host).host)
      .map((host) => getters['appsMetadata/get'](host)),
    aeternityApps: (state, getters) => aeternityApps
      .map((path) => getters['appsMetadata/get'](path)),
  }),
};
</script>

<style lang="scss" scoped>
@use '../../styles/functions';

.apps {
  .shortcuts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    .app-shortcut {
      margin-right: functions.rem(95px);
      margin-bottom: functions.rem(32px);
    }
  }
}
</style>
