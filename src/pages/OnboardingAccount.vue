<template>
  <div class="onboarding-screen">
    <img src="../assets/onboarding/accounts.svg">
    <guide fill="primary">
      Create an
      <br><em>æternity account</em>
      <div class="note">
        Which you need for receiving
        <br>Mainnet coins!
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

<style lang="scss" src="./OnboardingScreen.scss" scoped />
<style lang="scss" scoped>
  .onboarding-screen {
    flex-grow: 0;
  }
</style>
