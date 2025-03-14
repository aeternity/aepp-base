<template>
  <div class="app-browser">
    <header>
      <UrlForm :current-url="url" @new-url="reload" />

      <ButtonPlain @click="toggleBookmarking">
        <Component :is="bookmarked ? 'BookmarkFull' : 'Bookmark'" />
      </ButtonPlain>
      <ButtonPlain :to="{ name: 'app-list' }">
        <Home />
      </ButtonPlain>
      <ButtonPlain ref="menuButton" @click="showMenu = true">
        <More />
      </ButtonPlain>
    </header>

    <AeMenu
      :anchor="showMenu ? $refs.menuButton : null"
      :anchor-origin="{ vertical: 'top', horizontal: 'right' }"
      :transform-origin="{ vertical: 'top', horizontal: 'right' }"
      @close="showMenu = false"
    >
      <AeMenuItem @click="reload"> <Reload /> {{ $t('app.browser.refresh') }} </AeMenuItem>
    </AeMenu>

    <ProgressFake v-if="loading" />

    <iframe
      ref="iframe"
      :src="url"
      :title="url"
      importance="high"
      sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
      allow="camera; microphone"
      @load="loading = false"
    />

    <TabBar />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import sdkWallet from '../../lib/sdkWallet';
import { PROTOCOLS_ALLOWED, PROTOCOL_DEFAULT } from '../../lib/constants';
import UrlForm from '../../components/mobile/UrlForm.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';
import { Bookmark, BookmarkFull, Home, More, Reload } from '../../components/icons';
import AeMenu from '../../components/AeMenu.vue';
import AeMenuItem from '../../components/AeMenuItem.vue';
import ProgressFake from '../../components/ProgressFake.vue';
import TabBar from '../../components/mobile/TabBar.vue';

export default {
  components: {
    UrlForm,
    ButtonPlain,
    Bookmark,
    BookmarkFull,
    Home,
    More,
    Reload,
    AeMenu,
    AeMenuItem,
    ProgressFake,
    TabBar,
  },
  data: () => ({
    loading: true,
    newUrl: '',
    showMenu: false,
    sdkWalletUnbind: null,
  }),
  computed: {
    path() {
      return this.$route.fullPath.replace('/browser/', '');
    },
    url() {
      const path = this.path;
      const url = new URL(/^\w+:\D+/.test(path) ? path : `${PROTOCOL_DEFAULT}//${path}`);
      if (!PROTOCOLS_ALLOWED.includes(url.protocol)) url.protocol = PROTOCOL_DEFAULT;
      return url.toString();
    },
    host() {
      return new URL(this.url).host;
    },
    ...mapState({
      bookmarked({ apps }) {
        return apps.some(({ host, bookmarked }) => host === this.host && bookmarked);
      },
    }),
  },
  watch: {
    host: {
      immediate: true,
      handler(host) {
        function recreateSdk() {
          this.sdkWalletUnbind?.();
          this.sdkWalletUnbind = sdkWallet(this.$store, this.$refs.iframe.contentWindow, host);
        }
        if (this.$el) recreateSdk.call(this);
        else this.$once('hook:mounted', recreateSdk);
      },
    },
  },
  mounted() {
    const handler = () => {
      this.showMenu = false;
    };
    window.addEventListener('blur', handler);
    this.$once('hook:destroyed', () => {
      window.removeEventListener('blur', handler);
      this.sdkWalletUnbind();
    });
  },
  methods: {
    reload() {
      this.loading = true;
      this.$refs.iframe.src += '';
      this.$refs.iframe.focus();
    },
    toggleBookmarking() {
      this.$store.commit('toggleAppBookmarking', this.host);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';

.app-browser {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    padding-top: env(safe-area-inset-top);
    height: functions.rem(54px);
    line-height: functions.rem(54px);
    box-shadow: inset 0 0 functions.rem(8px) rgba(#1b4479, 0.1);

    .url-form {
      flex-grow: 1;
    }

    .button-plain {
      padding: 0 functions.rem(14px);
      color: variables.$color-neutral-negative-3;
    }
  }

  .progress-fake {
    margin-top: functions.rem(-2px);
  }

  iframe {
    flex-grow: 1;
    border: none;
  }
}
</style>
