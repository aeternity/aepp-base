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
      <ButtonPlain :to="{ name: 'apps' }">
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
        <Reload />Refresh
      </MenuItem>
    </Menu>

    <ProgressFake v-if="loading" />

    <iframe
      ref="iframe"
      :src="url"
      :scrolling="$globals.IS_IOS && 'no'"
      importance="high"
      sandbox="allow-scripts allow-same-origin"
      @load="loading = false"
    />

    <TabBar />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UrlForm from '../../components/mobile/UrlForm.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';
import {
  Bookmark, BookmarkFull, Home, More, Reload,
} from '../../components/icons';
import Menu from '../../components/Menu.vue';
import MenuItem from '../../components/MenuItem.vue';
import ProgressFake from '../../components/ProgressFake.vue';
import TabBar from '../../components/mobile/TabBar.vue';

const ALLOWED_PROTOCOLS = [
  'https:',
  ...window.location.protocol === 'https:' ? [] : ['http:'],
];
const DEFAULT_PROTOCOL = window.location.protocol === 'https:'
  || process.env.NODE_ENV === 'production' ? 'https:' : 'http:';

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
      const path = this.$route.fullPath.replace('/browser/', '');
      const url = new URL(/^\w+:\D+/.test(path) ? path : `${DEFAULT_PROTOCOL}//${path}`);
      if (!ALLOWED_PROTOCOLS.includes(url.protocol)) url.protocol = DEFAULT_PROTOCOL;
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
@import '../../styles/variables/colors.scss';
@import '../../styles/placeholders/typography.scss';

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
