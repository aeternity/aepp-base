<template>
  <div class="onboarding-secure-account">
    <phone>
      <img src="../assets/onboarding/account-secured-big.png">
    </phone>
    <h1>AirSign with your secure account</h1>
    <p>
      Setup your secure account with AirGap, to use a higher security level.
    </p>
  </div>
</template>

<script>
import Phone from '../components/OnboardingPhone';

export default {
  components: { Phone },
};
</script>

<style lang="scss" scoped>
.onboarding-secure-account {
  &.v-enter-active, &.v-leave-active {
    &, img {
      transition-duration: .3s;
    }

    img {
      transition-property: opacity, transform;
    }
  }

  &.v-enter, &.v-leave-to {
    img {
      opacity: 0;
      transform: translateY(100px);
    }
  }
}
</style>
