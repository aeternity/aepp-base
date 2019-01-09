<template>
  <div class="onboarding-page send">
    <img src="../../assets/onboarding/send.svg">
    <guide fill="primary">
      <em>Send & receive AE</em>
      <br>effortlessly
      <div class="note">
        Transfer to others or
        <br>subaccounts. Receive by
        <br>sharing your address.
      </div>
    </guide>
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
