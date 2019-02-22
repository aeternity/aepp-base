<template>
  <div class="app-browser">
    <header>
      <UrlForm
        :current-url="url"
        @new-url="newUrlHandler"
      />

      <ButtonPlain @click="toggleBookmarking">
        <AeIcon :name="bookmarked ? 'bookmark-full' : 'bookmark'" />
      </ButtonPlain>
      <ButtonPlain :to="{ name: 'apps' }">
        <AeIcon name="home" />
      </ButtonPlain>
    </header>

    <ProgressFake v-if="loading" />

    <iframe
      ref="iframe"
      :src="url"
      @load="loading = false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import UrlForm from '../../components/mobile/UrlForm.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';
import ProgressFake from '../../components/ProgressFake.vue';

export default {
  components: {
    UrlForm, ButtonPlain, AeIcon, ProgressFake,
  },
  data() {
    return {
      loading: true,
      newUrl: '',
    };
  },
  computed: {
    url() {
      const path = this.$route.fullPath.replace('/browser/', '');
      return `http${window.location.protocol === 'https:' ? 's' : ''}://${path}`;
    },
    host() {
      return new URL(this.url).host;
    },
    ...mapState({
      bookmarked({ bookmarkedApps }) {
        return bookmarkedApps.some(({ host }) => host === this.host);
      },
    }),
  },
  methods: {
    newUrlHandler() {
      this.loading = true;
      this.$refs.iframe.focus();
    },
    toggleBookmarking() {
      this.$store.commit('toggleAppBookmarking', this.host);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.app-browser {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    height: rem(54px);
    line-height: rem(54px);
    box-shadow: inset 0 0 rem(8px) rgba(#1B4479, 0.1);

    .url-form {
      flex-grow: 1;
    }

    .button-plain {
      padding: 0 rem(14px);
      color: $color-neutral-negative-3;

      .ae-icon {
        font-size: rem(20px);
        vertical-align: middle;
      }
    }
  }

  .progress-fake {
    margin-top: rem(-2px);
  }

  iframe {
    flex-grow: 1;
    border: none;
  }
}
</style>
