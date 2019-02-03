<template>
  <div class="app-browser">
    <header>
      <form @submit.prevent="updateUrl">
        <input
          :value="newUrl || url"
          placeholder="Search or type URL"
          @input="newUrl = $event.target.value"
          @focus="urlFocusHandler"
        />
      </form>

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
import ButtonPlain from '../components/ButtonPlain.vue';
import ProgressFake from '../components/ProgressFake.vue';

export default {
  components: { ButtonPlain, AeIcon, ProgressFake },
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
    updateUrl() {
      this.loading = true;
      this.$router.push(`/${this.newUrl.replace(/^https?:\//i, '')}`);
      this.newUrl = '';
      this.$refs.iframe.focus();
    },
    urlFocusHandler({ target }) {
      target.setSelectionRange(0, target.value.length);
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

    input, .button-plain {
      color: $color-neutral-negative-3;
    }

    form {
      flex-grow: 1;

      input {
        width: 100%;
        padding: rem(16px);
        box-sizing: border-box;
        border: none;
        outline: none;
        background: transparent;
        @extend %face-sans-base;
      }
    }

    .button-plain {
      padding: 0 rem(14px);

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
