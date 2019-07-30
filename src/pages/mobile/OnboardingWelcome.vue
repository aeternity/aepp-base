<template>
  <div class="onboarding-page">
    <img src="../../assets/onboarding/phones.svg">
    <Guide :template="$t('onboarding.welcome.guide')">
      <div
        slot="note"
        class="note"
      >
        {{ $t('onboarding.welcome.note') }}
      </div>
    </Guide>
  </div>
</template>

<script>
import Guide from '../../components/Guide.vue';

export default {
  components: { Guide },
};
</script>

<style lang="scss" src="./OnboardingPage.scss" scoped />
