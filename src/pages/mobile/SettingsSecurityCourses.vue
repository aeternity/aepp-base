<template>
  <MobilePage
    class="settings-security-courses"
    fill="neutral"
    title="AE Security courses"
    header-fill="light"
    right-button-icon-name="close"
    @right-button-click="$router.back()"
  >
    <SecurityCourse
      title="Intro & Disclaimer"
      subtitle="Security Course 1"
    />
    <SecurityCourse
      title="You are the bank"
      subtitle="Security Course 2"
    />
    <SecurityCourse
      title="Your privacy"
      subtitle="Security Course 3"
    />
    <SecurityCourse
      title="Security layers"
      subtitle="Security Course 4"
    />
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import SecurityCourse from '../../components/mobile/SecurityCourse.vue';

export default {
  components: {
    MobilePage,
    SecurityCourse,
  },
};
</script>
<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.settings-security-courses {
  .wrapper > .list-item-choose:first-child {
    margin-top: rem(40px);
  }
}
</style>
