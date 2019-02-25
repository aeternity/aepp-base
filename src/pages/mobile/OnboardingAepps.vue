<template>
  <div class="onboarding-page aepps">
    <img src="../../assets/onboarding/aepps.svg">
    <Guide>
      <em>Explore æpps</em>
      <div class="note">
        Bring the power of æternity
        <br>blockchain to your daily life.
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
