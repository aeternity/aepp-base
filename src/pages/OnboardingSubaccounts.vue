<template>
  <div class="onboarding-page subaccounts">
    <img src="../assets/onboarding/subaccounts.svg">
    <guide fill="primary">
      <em>Create subaccounts</em>
      <br>in seconds
      <div class="note">
        Use dedicated accounts to
        <br>safely store AE, to experiment
        <br>and fuel æpps.
      </div>
    </guide>
  </div>
</template>

<script>
import Guide from '../components/Guide.vue';

export default {
  components: { Guide },
};
</script>

<style lang="scss" src="./OnboardingPage.scss" scoped />
