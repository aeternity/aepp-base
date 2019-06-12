<template>
  <SettingsSecurityCourseWrapper name="layers">
    <h2>Adding security layers is highly recommended</h2>
    <p>
      Certainly when you are handling more than lunch money.
    </p>

    <h2>The Base æpp is built for small transactions </h2>
    <p>
      It is safe but not meant for high volume transactions or storage.
    </p>

    <h2>Vault-like security </h2>
    <p>
      Comes from AirGap (integrated with Base æpp) or a hardware crypto wallet.
    </p>

    <AeButton
      fill="alternative"
      :to="{ name: 'vault-setup-method' }"
    >
      Setup airgap
    </AeButton>
    <AeButton
      to="https://www.ledger.com"
      fill="dark"
    >
      Buy a Ledger wallet
    </AeButton>
  </SettingsSecurityCourseWrapper>
</template>

<script>
import SettingsSecurityCourseWrapper from './SettingsSecurityCourseWrapper.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    SettingsSecurityCourseWrapper,
    AeButton,
  },
};
</script>

<style lang="scss" scoped>
.settings-security-course-details.layers {
  --title-image: url('../../assets/security-courses/layers.svg') center right / auto 85%;
}
</style>
