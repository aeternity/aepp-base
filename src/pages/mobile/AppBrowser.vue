<template>
  <div class="app-browser">
    <header>
      <UrlForm
        :current-url="url"
        @new-url="reload"
      />

      <template v-if="path">
        <ButtonPlain :to="{ name: 'app-browser' }">
          <Home />
        </ButtonPlain>
      </template>
      <ButtonPlain
        ref="menuButton"
        @click="showMenu = true"
      >
        <More />
      </ButtonPlain>
    </header>

    <AeMenu
      :anchor="showMenu ? $refs.menuButton : null"
      :anchor-origin="{ vertical: 'top', horizontal: 'right' }"
      :transform-origin="{ vertical: 'top', horizontal: 'right' }"
      @close="showMenu = false"
    >
      <AeMenuItem @click="reload">
        <Reload /> {{ $t('app.browser.refresh') }}
      </AeMenuItem>
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
import BrowserWindowMessageConnection from '@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/connection/browser-window-message';
import { PROTOCOLS_ALLOWED, PROTOCOL_DEFAULT } from '../../lib/constants';
import UrlForm from '../../components/mobile/UrlForm.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';
import { Home, More, Reload } from '../../components/icons';
import AeMenu from '../../components/AeMenu.vue';
import AeMenuItem from '../../components/AeMenuItem.vue';
import ProgressFake from '../../components/ProgressFake.vue';
import TabBar from '../../components/mobile/TabBar.vue';

export default {
  components: {
    UrlForm,
    ButtonPlain,
    Home,
    More,
    Reload,
    AeMenu,
    AeMenuItem,
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
    path() {
      return this.$route.fullPath.replace(/\/browser\/?/, '');
    },
    url() {
      const path = this.path || process.env.VUE_APP_HOME_PAGE_URL;
      const url = new URL(/^\w+:\D+/.test(path) ? path : `${PROTOCOL_DEFAULT}//${path}`);
      if (!PROTOCOLS_ALLOWED.includes(url.protocol)) url.protocol = PROTOCOL_DEFAULT;
      return url.toString();
    },
    host() {
      return new URL(this.url).host;
    },
  },
  async mounted() {
    const sdk = this.$store.state.sdk.then ? await this.$store.state.sdk : this.$store.state.sdk;

    const connection = BrowserWindowMessageConnection({ target: this.$refs.iframe.contentWindow });
    sdk.addRpcClient(connection);
    const shareWalletInfoInterval = setInterval(
      () => sdk.shareWalletInfo(connection.sendMessage.bind(connection)),
      3000,
    );

    const handler = () => { this.showMenu = false; };
    window.addEventListener('blur', handler);
    this.$once('hook:destroyed', () => {
      window.removeEventListener('blur', handler);
      clearInterval(shareWalletInfoInterval);
      Object.keys(sdk.rpcClients).forEach((id) => sdk.removeRpcClient(id));
    });
  },
  methods: {
    reload() {
      this.loading = true;
      this.$refs.iframe.src += '';
      this.$refs.iframe.focus();
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
    box-shadow: inset 0 0 functions.rem(8px) rgba(#1B4479, 0.1);

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
