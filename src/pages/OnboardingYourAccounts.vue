<template>
  <div class="onboarding-your-accounts">
    <phone>
      <img src="../assets/onboarding/account-active.svg">
      <img src="../assets/onboarding/account-secured.svg">
      <img src="../assets/onboarding/account-inactive.svg">
    </phone>
    <h1>Your accounts</h1>
    <p>
      Different accounts can be made for different purposes.
      We will create a set for you to get you started!
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
.onboarding-your-accounts {
  &.v-enter-active, &.v-leave-active {
    transition-duration: .5s;
  }

  &.v-enter-active img {
    transition: opacity .1s ease-out, margin-top .4s .1s;
  }

  &.v-leave-active img {
    transition: transform .3s ease-in;

    &:nth-child(2) {
      transition-delay: .1s;
    }

    &:nth-child(3) {
      transition-delay: .2s;
    }
  }

  &.v-enter img {
    opacity: 0;
    margin-top: -83px;
  }

  &.v-leave-to img {
    transform: translateX(calc(-50vw - 110px));
  }

  img {
    margin-top: -45px;

    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
