<template>
  <div class="onboarding-page">
    <img src="../assets/onboarding/phones.svg">
    <guide fill="primary">
      <em>Base aepp</em>
      <br>æternity begins here
      <div class="note">
        Send & receive AE from your
        <br>wallet, manage accounts and
        <br>explore æpps.
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

<style lang="scss" src="./OnboardingPage.scss" scoped>
