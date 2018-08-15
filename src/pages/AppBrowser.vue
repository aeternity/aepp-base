<template>
  <div class="app-browser">
    <iframe
      :class="{ loading }"
      :src="path"
      @load="loading = false" />

    <div
      v-if="loading"
      class="loader" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      path: `http${window.location.protocol === 'https:' ? 's' : ''}:/${this.$route.fullPath}`,
    };
  },
  beforeMount() {
    window.addEventListener('message', this.updateUrl, false);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.updateUrl, false);
  },
  methods: {
    updateUrl({ data: { method, payload: url } }) {
      if (method !== 'urlChanged') return;
      this.$router.replace(url.replace(/^https?:\//i, ''));
    },
  },
};
</script>

<style lang="scss" scoped>
.app-browser {
  overflow: hidden;

  iframe, .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  iframe {
    border: none;
    transition: filter 2s;

    &.loading {
      filter: blur(3px);
    }
  }

  .loader {
    background-color: rgba(#000, 0.15);
    cursor: wait;

    @keyframes sk-bounce {
      0%, 100% {
        transform: scale(0.0);
      }
      50% {
        transform: scale(1.0);
      }
    }

    &:before, &:after {
      content: '';
      display: block;
      position: absolute;
      top: 30%;
      $circleSide: 60px;
      left: calc(50% - #{$circleSide / 2});
      height: $circleSide;
      width: $circleSide;
      background-color: #F03C6E;
      opacity: 0.6;
      border-radius: 50%;
      animation: sk-bounce 2.0s infinite ease-in-out;
    }

    &:after {
      animation-delay: -1s;
    }
  }
}
</style>
