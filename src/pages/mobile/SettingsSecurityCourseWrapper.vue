<template>
  <MobilePage
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
  </MobilePage>
</template>

<script>
import getCourses from './settingsSecurityCourseList';
import MobilePage from '../../components/mobile/Page.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    AeButton,
  },
  props: {
    name: { type: String, required: true },
  },
  computed: {
    courses: getCourses,
    course() {
      const idx = this.courses.findIndex(c => c.name === this.name) + 1;
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
@import '../../styles/typography';

.settings-security-course-details.mobile-page {
  ::v-deep {
    .header-mobile {
      display: none;
    }

    header {
      background: var(--title-image) no-repeat, $color-alternative;
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
        margin-top: rem(16px);
        font-weight: 700;

        &.important {
          color: $color-primary;
        }
      }

      ul {
        margin-top: rem(19px);
        padding-left: rem(25px);
        list-style: none;
        position: relative;

        &.long-items li:not(:first-child) {
          padding-top: rem(24px);
        }

        li:before {
          position: absolute;
          left: 0;
          font-weight: bold;
          content: '→';
        }
      }

      .ae-button.medium {
        margin: rem(18px) 0;

        &:first-of-type {
          margin-top: rem(32px);
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  header {
    h1, p {
      margin: rem(10px) 0;
      color: #fff;
    }

    h1 {
      margin-top: rem(160px);
      @extend %face-sans-base;
      font-size: rem(30px);
      font-weight: 600;
    }

    p {
      margin-bottom: rem(30px);
      @extend %face-sans-s;
    }
  }
}
</style>
