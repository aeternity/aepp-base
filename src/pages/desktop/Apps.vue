<template>
  <div class="apps">
    <guide size="big">
      æpps <em>browser</em> (beta)
    </guide>

    <note>
      æpps running working with the æternity blockchain will be visible here.
      We will implement a full æpp browser here soon. The æpps listed below are now only links.
    </note>

    <div class="shortcuts">
      <app-shortcut
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
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.apps {
  .shortcuts {
    display: flex;

    .app-shortcut {
      margin-right: rem(95px);
    }
  }
}
</style>
