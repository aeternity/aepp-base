<template>
  <div class="apps">
    <Guide :template="$t('app.list.guide')" size="big" />

    <Note>
      {{ $t('app.list.note') }}
    </Note>

    <div class="shortcuts">
      <AppShortcut v-for="(app, idx) in apps" :key="idx" v-bind="app" :to="`https://${app.host}`" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { fetchJson } from '../../store/utils';
import Guide from '../../components/Guide.vue';
import Note from '../../components/Note.vue';
import AppShortcut from '../../components/AppShortcut.vue';
import appsRegistry from '../../lib/appsRegistry';

export default {
  components: { Guide, Note, AppShortcut },
  computed: mapState({
    apps: (state, getters) =>
      appsRegistry.map((host) => ({ ...getters['appsMetadata/get'](host), host })),
  }),
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
