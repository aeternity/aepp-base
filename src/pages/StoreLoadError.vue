<template>
  <FullscreenPrompt
    :message="$t('store-load-error.note')"
    :button-text="$t('store-load-error.reset')"
    @button-click="resetState"
  />
</template>

<script>
import FullscreenPrompt from './FullscreenPrompt.vue';
import { resetState } from '../store/plugins/persistState';
import { i18n, fetchAndSetLocale, preferredLocale } from '../store/plugins/ui/languages';

export default {
  components: { FullscreenPrompt },
  async mounted() {
    await fetchAndSetLocale(preferredLocale);
  },
  methods: { resetState },
  i18n,
};
</script>

<style type="scss">
@use '~normalize.css';

html,
body {
  height: 1px;
  min-height: 100%;
}

body {
  display: flex;
}
</style>
