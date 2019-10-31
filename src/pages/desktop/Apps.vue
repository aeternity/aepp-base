<template>
  <div class="apps">
    <Guide
      :template="$t('app.list.guide')"
      size="big"
    />

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
import { aeternityAppsPaths } from '../../lib/appsRegistry';
import Guide from '../../components/Guide.vue';
import Note from '../../components/Note.vue';
import AppShortcut from '../../components/AppShortcut.vue';

export default {
  components: { Guide, Note, AppShortcut },
  computed: mapState({
    aeternityApps: (state, { getAppMetadata }) => aeternityAppsPaths
      .map(path => ({ ...getAppMetadata(path), path })),
  }),
};
</script>

<style lang="scss" scoped>
@import '../../styles/functions';

.apps {
  .shortcuts {
    display: flex;

    .app-shortcut {
      margin-right: rem(95px);
    }
  }
}
</style>
