<template>
  <div class="apps">
    <Guide :template="$t('app.list.guide')" size="big" />

    <Note>
      {{ $t('app.list.note') }}
    </Note>

    <div class="shortcuts">
      <AppShortcut
        v-for="(app, idx) in aeternityApps"
        :key="idx"
        v-bind="app"
        :to="`https://${app.path}`"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { fetchJson } from '../../store/utils';
import Guide from '../../components/Guide.vue';
import Note from '../../components/Note.vue';
import AppShortcut from '../../components/AppShortcut.vue';

export default {
  components: { Guide, Note, AppShortcut },
  data: () => ({ aeternityAppsPaths: [] }),
  computed: mapState({
    aeternityApps(state, getters) {
      return this.aeternityAppsPaths.map((path) => ({
        ...getters['appsMetadata/get'](path),
        path,
      }));
    },
  }),
  async mounted() {
    this.aeternityAppsPaths = await fetchJson(`${process.env.VUE_APP_HOME_PAGE_URL}/apps.json`);
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/functions';

.apps {
  .shortcuts {
    display: flex;

    .app-shortcut {
      margin-right: functions.rem(95px);
    }
  }
}
</style>
