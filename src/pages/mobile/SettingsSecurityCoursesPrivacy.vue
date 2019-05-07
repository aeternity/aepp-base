<template>
  <MobilePage
    header-fill="alternative"
    class="settings-security-courses privacy"
  >
    <template slot="header">
      <Guide fill="neutral">
        <em>Your privacy</em>
        <p>Security Course 3 of 4</p>
      </Guide>
    </template>

    <h2>æternity values privacy</h2>
    <p>
      Base æpp will never ask, receive, transmit or store your:
    </p>

    <ul>
      <li>
        First and last name
      </li>
      <li>
        Date of birth
      </li>
      <li>
        Home address
      </li>
      <li>
        Email address
      </li>
      <li>
        Phone number
      </li>
      <li>
        Social media accounts
      </li>
      <li>
        IP address
      </li>
    </ul>
    <AeButton
      :to="{ name: 'settings-security-courses-layers' }"
      fill="alternative"
    >
      Go to course 4
    </AeButton>
    <AeButton
      :to="{ name: 'settings-security-courses' }"
      plain
    >
      To course overview
    </AeButton>
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeButton,
  },
};
</script>
<style lang="scss" src="./SecurityCourses.scss" scoped/>
<style lang="scss" scoped>
.settings-security-courses.privacy {
  /deep/ header.alternative {
    background-image: url('../../assets/security-courses/eye.svg');
    background-repeat: no-repeat;
  }
}
</style>
