<template>
  <div class="onboarding">
    <Transition
      mode="out-in"
      appear
    >
      <RouterView />
    </Transition>

    <footer>
      <AeButton
        :to="{ name: 'intro' }"
        size="small"
        plain
      >
        {{ $t('onboarding.skip') }}
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
        :to="{ name: isLastStep ? 'intro' : stepRouteNames[currentStepIdx + 1] }"
        size="small"
        plain
        data-cy="next"
      >
        {{ isLastStep ? $t('onboarding.start') : $t('next') }}
      </AeButton>
    </footer>
  </div>
</template>

<script>
import AeButton from '../../components/AeButton.vue';
import { DISABLED_BROWSER } from '../../lib/constants';

export default {
  components: { AeButton },
  data: () => ({
    stepRouteNames: [
      'onboarding',
      'onboarding-send',
      ...DISABLED_BROWSER ? [] : ['onboarding-aepps'],
      'onboarding-subaccounts',
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
@use '../../styles/variables';
@use '../../styles/functions';

.onboarding {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: variables.$color-neutral-positive-2;

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 functions.rem(48px);
    padding-bottom: env(safe-area-inset-bottom);

    .ae-button {
      margin-bottom: functions.rem(23px);
      margin-top: functions.rem(23px);
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
        width: functions.rem(10px);
        height: functions.rem(10px);
        margin: functions.rem(5px);
        background-color: variables.$color-neutral-positive-1;
        border-radius: 50%;

        &.active {
          background-color: variables.$color-primary;
          position: relative;
          z-index: 1;
        }
      }
    }
  }
}
</style>
