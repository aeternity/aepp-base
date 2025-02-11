<template>
  <div class="onboarding-page">
    <img src="../../assets/onboarding/subaccounts.svg" />
    <Guide :template="$t('onboarding.subaccounts.guide')">
      <div slot="note" class="note">
        {{ $t('onboarding.subaccounts.note') }}
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
