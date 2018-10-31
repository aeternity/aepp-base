<template>
  <mobile-page class="onboarding">
    <transition
      mode="out-in"
      appear
    >
      <router-view />
    </transition>
    <footer slot="footer">
      <ae-button
        :to="{ name: 'new-account'}"
        size="small"
        plain
        uppercase
      >
        Skip
      </ae-button>
      <transition-group
        name="step-dots"
        class="step-dots"
      >
        <router-link
          v-for="(name, idx) in stepRouteNames"
          :key="name === $route.name ? 'active' : idx - (currentStepIdx < idx ? 1 : 0)"
          :class="{ active: name === $route.name }"
          :to="{ name }"
        />
      </transition-group>
      <ae-button
        :to="{ name: isLastStep ? 'new-account' : stepRouteNames[currentStepIdx + 1] }"
        class="next"
        size="small"
        plain
        uppercase
      >
        {{ isLastStep ? 'Start' : 'Next' }}
      </ae-button>
    </footer>
  </mobile-page>
</template>

<script>
import { AeButton } from '@aeternity/aepp-components';
import MobilePage from '../components/MobilePage.vue';
import HeaderDesktop from '../components/HeaderDesktop.vue';

export default {
  components: { MobilePage, AeButton, HeaderDesktop },
  data: () => ({
    stepRouteNames: [
      'onboarding',
      'onboarding-account',
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

<style lang="scss" src="../components/MobilePageContent.scss" scoped />
<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/mixins.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography';

.onboarding.mobile-page {
  background-color: $color-neutral-positive-2;

  .panel {
    @include abovePhone {
      min-height: 650px;
    }

    > .header-mobile {
      display: none;
    }

    > .content {
      margin-left: 0;
      margin-right: 0;

      h1, p {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .step-dots {
      position: absolute;
      left: 50%;
      transform: translate(-50%);

      &-move {
        transition: transform .2s;
      }

      a {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 5px;
        background-color: $silver;
        border-radius: 50%;

        &.active {
          background-color: $maegenta;
          position: relative;
          z-index: 1;
        }
      }
    }

    .ae-button /deep/ .label {
      padding: 6px 25px;
      @extend %face-sans-xs;
      font-weight: bold;
    }
  }
}
</style>
