<template>
  <div class="onboarding-screen">
    <img src="../assets/onboarding/phones.svg">
    <guide fill="primary">
      <em>Base aepp</em>
      <br>your port to æternity
      <div class="note">
        Will consist of the ae wallet,
        <br>decentralised aepps & manage
        <br>accounts.
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

<style lang="scss" src="./OnboardingScreen.scss" scoped>
