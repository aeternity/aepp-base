<template>
  <div class="onboarding-page subaccounts">
    <img src="../../assets/onboarding/subaccounts.svg">
    <Guide>
      <em>Create subaccounts</em>
      <br>in seconds
      <div class="note">
        Create dedicated accounts for
        <br>spending, storage and to fuel æpps.
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
