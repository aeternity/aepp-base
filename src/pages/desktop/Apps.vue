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
import { aeternityApps } from '../../lib/appsRegistry';
import Guide from '../../components/Guide.vue';
import Note from '../../components/Note.vue';
import AppShortcut from '../../components/AppShortcut.vue';

export default {
  components: { Guide, Note, AppShortcut },
  data: () => ({ aeternityApps }),
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.apps {
  .shortcuts {
    display: flex;

    .app-shortcut {
      margin-right: rem(95px);
    }
  }
}
</style>
