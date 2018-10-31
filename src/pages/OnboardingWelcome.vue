<template>
  <div class="onboarding-welcome">
    <div class="wrapper">
      <div class="image" />
    </div>
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

<style lang="scss" scoped>
@import './OnboardingScreen.scss';

.onboarding-welcome {
  &.v-enter-active, &.v-leave-active {
    .wrapper {
      .image {
        transition-property: background-position, opacity;
      }
    }
  }

  &.v-enter-active {
    transition-duration: 1s;

    .wrapper {
      .image {
        transition-timing-function: ease-out;
        transition-duration: .5s;
      }
    }
  }

  &.v-leave-active {
    transition-duration: .5s;

    .wrapper {
      .image {
        transition-timing-function: ease-in;
        transition-delay: .25s;
        transition-duration: .25s;
      }
    }
  }

  &.v-enter, &.v-leave-to {
    .wrapper {
      .image {
        opacity: 0;
      }
    }
  }

  &.v-enter .wrapper {
    .image {
      background-position-y: top;
    }
  }

  &.v-leave-to .wrapper {
    .image {
      background-position-x: -25%;
    }
  }

  .wrapper .image {
    background: url('../assets/onboarding/phones.svg') no-repeat center;
  }
}
</style>
