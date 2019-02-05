<template>
  <div class="app-browser">
    <header>
      <url-form
        :current-url="url"
        @new-url="newUrlHandler"
      />

      <button-plain>
        <ae-icon name="bookmark" />
      </button-plain>
      <button-plain :to="{ name: 'apps' }">
        <ae-icon name="home" />
      </button-plain>
    </header>

    <progress-fake v-if="loading" />

    <iframe
      ref="iframe"
      :src="url"
      @load="loading = false"
    />
  </div>
</template>

<script>
import { AeIcon } from '@aeternity/aepp-components-3';
import UrlForm from '../components/mobile/UrlForm.vue';
import ButtonPlain from '../components/ButtonPlain.vue';
import ProgressFake from '../components/ProgressFake.vue';

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
      return `http${window.location.protocol === 'https:' ? 's' : ''}:/${this.$route.fullPath}`;
    },
  },
  methods: {
    newUrlHandler() {
      this.loading = true;
      this.$refs.iframe.focus();
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
