<template>
  <div class="app-browser">
    <header>
      <UrlForm
        :current-url="url"
        @new-url="reload"
      />

      <ButtonPlain @click="toggleBookmarking">
        <AeIcon :name="bookmarked ? 'bookmark-full' : 'bookmark'" />
      </ButtonPlain>
      <ButtonPlain :to="{ name: 'apps' }">
        <AeIcon name="home" />
      </ButtonPlain>
      <ButtonPlain
        ref="menuButton"
        @click="showMenu = true"
      >
        <AeIcon name="more" />
      </ButtonPlain>
    </header>

    <Menu
      :anchor="showMenu ? $refs.menuButton : null"
      :anchor-origin="{ vertical: 'top', horizontal: 'right' }"
      :transform-origin="{ vertical: 'top', horizontal: 'right' }"
      @close="showMenu = false"
    >
      <MenuItem @click="reload">
        <AeIcon name="reload" />Refresh aepp
      </MenuItem>
    </Menu>

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
import Menu from '../../components/Menu.vue';
import MenuItem from '../../components/MenuItem.vue';
import ProgressFake from '../../components/ProgressFake.vue';

export default {
  components: {
    UrlForm, ButtonPlain, AeIcon, Menu, MenuItem, ProgressFake,
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
      return `http${window.location.protocol === 'https:' ? 's' : ''}://${path}`;
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
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

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
