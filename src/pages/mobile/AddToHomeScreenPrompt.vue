<template>
  <FullscreenPrompt
    :message="$t('add-to-home-screen.note')"
    :button-text="deferredPrompt ? $t('add-to-home-screen.button') : ''"
    @button-click="() => deferredPrompt.prompt()"
  />
</template>

<script>
import FullscreenPrompt from '../FullscreenPrompt.vue';

export default {
  components: { FullscreenPrompt },
  data: () => ({
    deferredPrompt: null,
  }),
  mounted() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
  },
};
</script>
