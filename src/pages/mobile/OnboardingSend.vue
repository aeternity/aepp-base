<template>
  <div class="onboarding-page send">
    <img src="../../assets/onboarding/send.svg" />
    <Guide :template="$t('onboarding.send.guide')">
      <div slot="note" class="note">
        {{ $t('onboarding.send.note') }}
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
.onboarding-page.send img {
  width: 190px;
}
</style>
