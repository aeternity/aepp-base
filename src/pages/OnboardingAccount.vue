<template>
  <div class="onboarding-page account">
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

<style lang="scss" src="./OnboardingPage.scss" scoped />
<style lang="scss" scoped>
.onboarding-page.account img {
  width: 190px;
}
</style>
