<template>
  <div class="app-browser">
    <header>
      <UrlForm
        :current-url="url"
        @new-url="reload"
      />

      <ButtonPlain @click="toggleBookmarking">
        <Component :is="bookmarked ? 'BookmarkFull' : 'Bookmark'" />
      </ButtonPlain>
      <ButtonPlain :to="{ name: 'app-browser' }">
        <Home />
      </ButtonPlain>
      <ButtonPlain
        ref="menuButton"
        @click="showMenu = true"
      >
        <More />
      </ButtonPlain>
    </header>

    <Menu
      :anchor="showMenu ? $refs.menuButton : null"
      :anchor-origin="{ vertical: 'top', horizontal: 'right' }"
      :transform-origin="{ vertical: 'top', horizontal: 'right' }"
      @close="showMenu = false"
    >
      <MenuItem @click="reload">
        <Reload /> {{ $t('app.browser.refresh') }}
      </MenuItem>
    </Menu>

    <ProgressFake v-if="loading" />

    <iframe
      ref="iframe"
      :src="url"
      :scrolling="$globals.IS_IOS && 'no'"
      importance="high"
      sandbox="allow-scripts allow-same-origin allow-forms"
      allow="camera; microphone"
      @load="loading = false"
    />

    <TabBar />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { PROTOCOLS_ALLOWED, PROTOCOL_DEFAULT } from '../../lib/constants';
import UrlForm from '../../components/mobile/UrlForm.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';
import {
  Bookmark, BookmarkFull, Home, More, Reload,
} from '../../components/icons';
import Menu from '../../components/Menu.vue';
import MenuItem from '../../components/MenuItem.vue';
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
    Menu,
    MenuItem,
    ProgressFake,
    TabBar,
  },
  data() {
    return {
      loading: true,
      newUrl: '',
      showMenu: false,
    };
  },
  computed: {
    url() {
      const path = this.$route.fullPath.replace(/\/browser\/?/, '') || process.env.VUE_APP_HOME_PAGE_URL;
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
  mounted() {
    const handler = () => { this.showMenu = false; };
    window.addEventListener('blur', handler);
    this.$once('hook:destroyed', () => window.removeEventListener('blur', handler));
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
@import '../../styles/functions';

.app-browser {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    padding-top: env(safe-area-inset-top);
    height: rem(54px);
    line-height: rem(54px);
    box-shadow: inset 0 0 rem(8px) rgba(#1B4479, 0.1);

    .url-form {
      flex-grow: 1;
    }

    .button-plain {
      padding: 0 rem(14px);
      color: $color-neutral-negative-3;
    }
  }

  .progress-fake {
    margin-top: rem(-2px);
  }

  iframe {
    flex-grow: 1;
    width: 100vw;
    border: none;
  }
}
</style>
