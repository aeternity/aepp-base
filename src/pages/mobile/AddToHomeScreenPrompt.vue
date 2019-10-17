<template>
  <FullscreenPrompt
    class="add-to-home-screen-prompt"
    :message="$t('add-to-home-screen.note')"
    :button-text="deferredPrompt ? $t('add-to-home-screen.button') : ''"
    @button-click="() => deferredPrompt.prompt()"
  >
    <AeButton
      fill="light"
      plain
      @click="skipAddingToHomeScreen"
    >
      {{ $t('add-to-home-screen.skip') }}
    </AeButton>
  </FullscreenPrompt>
</template>

<script>
import FullscreenPrompt from '../FullscreenPrompt.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: { FullscreenPrompt, AeButton },
  data: () => ({
    deferredPrompt: null,
  }),
  mounted() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
  },
  methods: {
    skipAddingToHomeScreen() {
      this.$store.commit('skipAddingToHomeScreen');
      this.$router.push({ name: 'intro' });
    },
  },
};
</script>

<style type="scss" scoped>
.add-to-home-screen-prompt .ae-button.light {
  font-weight: normal;
}
</style>
