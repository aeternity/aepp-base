<template>
  <Page
    fill="neutral"
    class="settings-security-course-details"
    hide-tab-bar
    :class="name"
    header-fill="alternative"
  >
    <template slot="header">
      <h1>{{ course.title }}</h1>
      <p>
        {{ $t(
          'security-courses.settings.details.subtitle',
          { n: course.idx, count: courses.length },
        ) }}
      </p>
    </template>

    <slot />

    <AeButton
      v-if="course.nextRouteName"
      fill="alternative"
      :to="{ name: course.nextRouteName, params: $route.params }"
    >
      {{ $tc('security-courses.settings.details.to-next', course.idx + 1) }}
    </AeButton>
    <AeButton
      plain
      :to="{ name: 'settings-security-course-list', params: $route.params }"
    >
      {{ $t('security-courses.settings.details.to-list') }}
    </AeButton>
  </Page>
</template>

<script>
import getCourses from './settingsSecurityCourseList';
import Page from '../../components/Page.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    Page,
    AeButton,
  },
  props: {
    name: { type: String, required: true },
  },
  computed: {
    courses: getCourses,
    course() {
      const idx = this.courses.findIndex((c) => c.name === this.name) + 1;
      return {
        ...this.courses[idx - 1],
        idx,
        nextRouteName: idx === this.courses.length ? null : this.courses[idx].routeName,
      };
    },
  },
  mounted() {
    this.$store.commit('markSecurityCourseAsRead', this.name);
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.settings-security-course-details.page {
  ::v-deep {
    .page-header {
      display: none;
    }

    header {
      background: var(--title-image) no-repeat, variables.$color-alternative;
    }

    main .wrapper {
      > :first-child {
        margin-top: 0;
      }

      h2, p, ul {
        margin: 0;
        @extend %face-sans-base;
        color: #000;
      }

      h2 {
        margin-top: functions.rem(16px);
        font-weight: 700;

        &.important {
          color: variables.$color-primary;
        }
      }

      ul {
        margin-top: functions.rem(19px);
        padding-left: functions.rem(25px);
        list-style: none;
        position: relative;

        &.long-items li:not(:first-child) {
          padding-top: functions.rem(24px);
        }

        li:before {
          position: absolute;
          left: 0;
          font-weight: bold;
          content: '→';
        }
      }

      .ae-button.medium {
        margin: functions.rem(18px) 0;

        &:first-of-type {
          margin-top: functions.rem(32px);
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  header {
    h1, p {
      margin: functions.rem(10px) 0;
      color: #fff;
    }

    h1 {
      margin-top: functions.rem(160px);
      @extend %face-sans-base;
      font-size: functions.rem(30px);
      font-weight: 600;
    }

    p {
      margin-bottom: functions.rem(30px);
      @extend %face-sans-s;
    }
  }
}
</style>
