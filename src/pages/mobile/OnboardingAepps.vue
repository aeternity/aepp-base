<template>
  <div class="onboarding-page aepps">
    <img src="../../assets/onboarding/aepps.svg" />
    <Guide>
      <em>{{ $t('onboarding.aepps.guide') }}</em>
      <div class="note">
        {{ $t('onboarding.aepps.note') }}
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
<style lang="scss" scoped>
.onboarding-page.aepps img {
  width: 280px;
}
</style>
