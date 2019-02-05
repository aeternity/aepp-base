<template>
  <mobile-page
    class="apps"
    fill="neutral"
  >
    <guide><em>Browse æpps</em></guide>

    <url-form />

    <div class="shortcuts">
      <app-shortcut
        v-for="(app, idx) in aeternityApps"
        :key="`app-shortcut-aeternity-app-${idx}`"
        v-bind="app"
        :to="app.path"
      />
    </div>

    <guide>æternity æpps</guide>

    <ae-card fill="maximum">
      <template v-for="(app, idx) in aeternityApps">
        <list-item
          :key="`list-item-aeternity-app-${idx}`"
          :to="app.path"
          :title="app.name"
          :subtitle="app.path"
        >
          <img
            slot="icon"
            :src="app.icon"
            :alt="app.name"
          >
        </list-item>
        <p
          :key="idx"
          class="app-description"
        >
          {{ app.description }}
        </p>
      </template>
    </ae-card>
  </mobile-page>
</template>

<script>
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
  }),
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
    margin: rem(40px) rem(-10px);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    grid-gap: 30px 10px;
    justify-items: center;
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
