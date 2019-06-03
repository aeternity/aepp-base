<template>
  <SettingsSecurityCourseWrapper name="privacy">
    <h2>æternity values privacy</h2>

    <p>
      Base æpp will never ask, receive, transmit or store your:
    </p>

    <ul>
      <li>First and last name</li>
      <li>Date of birth</li>
      <li>Home address</li>
      <li>Email address</li>
      <li>Phone number</li>
      <li>Social media accounts</li>
      <li>IP address</li>
    </ul>
  </SettingsSecurityCourseWrapper>
</template>

<script>
import SettingsSecurityCourseWrapper from './SettingsSecurityCourseWrapper.vue';

export default {
  components: { SettingsSecurityCourseWrapper },
};
</script>

<style lang="scss" scoped>
.settings-security-course-details.privacy {
  --title-image: url('../../assets/security-courses/eye.svg') center left / auto 85%;
}
</style>
