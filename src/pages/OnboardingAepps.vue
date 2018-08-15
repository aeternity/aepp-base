<template>
  <div class="onboarding-aepps">
    <phone>
      <ae-app-icon :src="require('../assets/icons/aepps/messages.svg')" />
      <ae-app-icon :src="require('../assets/icons/aepps/proof.svg')" />
      <ae-app-icon :src="require('../assets/icons/aepps/transfer.svg')" />
      <ae-app-icon :src="require('../assets/icons/aepps/settings.svg')" />
      <ae-app-icon :src="require('../assets/icons/plus.svg')" />
    </phone>
    <h1>The Aepp Ecosystem</h1>
    <p>
      Explore the aeternity aepp ecosystem and use them with a desired account.
    </p>
  </div>
</template>

<script>
import { AeAppIcon } from '@aeternity/aepp-components';
import Phone from '../components/OnboardingPhone.vue';

export default {
  components: { AeAppIcon, Phone },
};
</script>

<style lang="scss" scoped>
.onboarding-aepps {
  &.v-enter-active, &.v-leave-active {
    transition-duration: .35s;

    .ae-app-icon {
      transition-duration: .3s;
      transition-property: opacity, transform;

      &:nth-child(4), &:nth-child(5) {
        transition-delay: .05s;
      }
    }
  }

  &.v-enter, &.v-leave-to {
    .ae-app-icon {
      opacity: 0;
    }
  }

  &.v-enter .ae-app-icon {
    transform: translateY(50px);
  }

  &.v-leave-to .ae-app-icon {
    transform: translateY(-50px);
  }

  .onboarding-phone /deep/ .content {
    padding: 7px;
  }

  .ae-app-icon {
    float: left;
    width: 48px;
    height: 48px;
    margin: 10px;
    padding: 8px;
  }
}
</style>
