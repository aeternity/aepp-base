<template>
  <div class="onboarding-account">
    <div class="wrapper">
      <div class="image" />
    </div>
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

<style lang="scss" scoped>
@import './OnboardingScreen.scss';

.onboarding-account {
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

  .wrapper .image {
    background: url('../assets/onboarding/accounts.svg') no-repeat center;
  }
}
</style>
