<template>
  <MobilePage
    class="settings-security-course-list"
    fill="neutral"
    title="AE Security courses"
    header-fill="light"
    right-button-icon-name="close"
    :right-button-to="{ name: 'settings' }"
  >
    <ListItemChoose
      v-for="(course, idx) in courses"
      :key="idx"
      :title="course.title"
      :subtitle="`Security Course ${idx + 1}`"
      :to="{ name: course.routeName }"
      :checked="course.isRead"
      active
    >
      <img
        slot="icon"
        :src="lockEmoji"
      >
    </ListItemChoose>
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import lockEmoji from 'emoji-datasource-apple/img/apple/64/1f513.png';
import courses from './settingsSecurityCourseList';
import ListItemChoose from '../../components/ListItemChoose.vue';
import MobilePage from '../../components/mobile/Page.vue';

export default {
  components: {
    MobilePage,
    ListItemChoose,
  },
  data: () => ({ lockEmoji }),
  computed: mapState({
    courses: ({ mobile: { readSecurityCourses } }) => courses.map(course => ({
      ...course,
      isRead: readSecurityCourses.includes(course.name),
    })),
  }),
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.settings-security-course-list .list-item-choose:first-child {
  margin-top: rem(40px);
}
</style>
