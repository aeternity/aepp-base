<template>
  <div class="onboarding-active-account">
    <phone bottom>
      <img src="../assets/img/onboarding/dummy-list-view.svg">
      <img
        class="account"
        src="../assets/img/onboarding/account-active-collapsed.svg"
      >
    </phone>
    <h1>Your active account</h1>
    <p>
      Aepps automatically use the active account, displayed in the bottom.
      The grid icon takes you back to the browser.
    </p>
  </div>
</template>

<script>
import Phone from '../components/OnboardingPhone'

export default {
  components: { Phone }
}
</script>

<style lang="scss" scoped>
.onboarding-active-account {
  &.v-enter-active, &.v-leave-active {
    &, .account {
      transition-duration: .3s;
    }

    .account {
      transition-property: opacity, transform;
    }
  }

  &.v-enter, &.v-leave-to {
    .account {
      opacity: 0;
      transform: translateY(50px);
    }
  }

  img {
    display: block;
    margin: 15px auto;
  }

  .account {
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
</style>
