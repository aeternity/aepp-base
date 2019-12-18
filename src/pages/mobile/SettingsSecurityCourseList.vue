<template>
  <MobilePage
    class="settings-security-course-list"
    fill="neutral"
    :title="$t('security-courses.settings.title')"
    header-fill="light"
    right-button-icon-name="close"
    :right-button-to="{ name: 'settings' }"
    :hide-tab-bar="firstEnter"
  >
    <ListItemChoose
      v-for="(course, idx) in courses"
      :key="idx"
      :title="course.title"
      :subtitle="$t('security-courses.settings.list.subtitle', { n: idx + 1 })"
      :to="{ name: course.routeName, params: { firstEnter } }"
      :checked="course.isRead"
      active
    >
      <img
        slot="icon"
        :src="lockEmoji"
      >
    </ListItemChoose>

    <template
      v-if="firstEnter"
      slot="footer"
    >
      <AeButton
        fill="secondary"
        :to="$globals.ROUTE_MOBILE_LOGGED_IN"
      >
        {{ $t('security-courses.settings.list.to-base-app') }}
      </AeButton>
      <Note>
        {{ $t('security-courses.settings.list.note') }}
      </Note>
    </template>
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import lockEmoji from 'emoji-datasource-apple/img/apple/64/1f513.png';
import getCourses from './settingsSecurityCourseList';
import ListItemChoose from '../../components/ListItemChoose.vue';
import MobilePage from '../../components/mobile/Page.vue';
import AeButton from '../../components/AeButton.vue';
import Note from '../../components/Note.vue';

export default {
  components: {
    MobilePage,
    ListItemChoose,
    AeButton,
    Note,
  },
  props: {
    firstEnter: Boolean,
  },
  data: () => ({ lockEmoji }),
  computed: mapState({
    courses: ({ mobile: { readSecurityCourses } }) => getCourses().map(course => ({
      ...course,
      isRead: readSecurityCourses.includes(course.name),
    })),
  }),
};
</script>

<style lang="scss" scoped>
@import '../../styles/functions';

.settings-security-course-list {
  .list-item-choose:first-child {
    margin-top: rem(40px);
  }

  .ae-button {
    margin-bottom: rem(20px);
  }

  .note {
    text-align: center;
  }
}
</style>
