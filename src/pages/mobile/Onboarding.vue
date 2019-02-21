<template>
  <MobilePage
    class="onboarding"
    fill="neutral"
  >
    <Transition
      mode="out-in"
      appear
    >
      <RouterView />
    </Transition>

    <template slot="footer">
      <AeButton
        :to="{ name: 'new-account'}"
        size="small"
        plain
      >
        Skip
      </AeButton>
      <TransitionGroup
        name="step-dots"
        class="step-dots"
      >
        <RouterLink
          v-for="(name, idx) in stepRouteNames"
          :key="name === $route.name ? 'active' : idx - (currentStepIdx < idx ? 1 : 0)"
          :class="{ active: name === $route.name }"
          :to="{ name }"
        />
      </TransitionGroup>
      <AeButton
        :to="{ name: isLastStep ? 'new-account' : stepRouteNames[currentStepIdx + 1] }"
        size="small"
        plain
      >
        {{ isLastStep ? 'Start' : 'Next' }}
      </AeButton>
    </template>
  </MobilePage>
</template>

<script>
import AeButton from '../../components/AeButton.vue';
import MobilePage from '../../components/mobile/Page.vue';

export default {
  components: { MobilePage, AeButton },
  data: () => ({
    stepRouteNames: [
      'onboarding',
      'onboarding-subaccounts',
      'onboarding-send',
    ],
  }),
  computed: {
    currentStepIdx() {
      return this.stepRouteNames.indexOf(this.$route.name);
    },
    isLastStep() {
      return this.currentStepIdx === this.stepRouteNames.length - 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.onboarding.mobile-page {
  /deep/ footer .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .step-dots {
    position: absolute;
    left: 50%;
    transform: translate(-50%);

    &-move {
      transition: transform .2s;
    }

    a {
      display: inline-block;
      width: rem(10px);
      height: rem(10px);
      margin: rem(5px);
      background-color: $color-neutral-positive-1;
      border-radius: 50%;

      &.active {
        background-color: $color-primary;
        position: relative;
        z-index: 1;
      }
    }
  }
}
</style>
