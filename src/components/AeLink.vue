<template>
  <RouterLink v-if="useRouterLink" class="ae-link" :to="to">
    <slot />
  </RouterLink>
  <a v-else class="ae-link" :href="to" :target="target" @click="clickHandler">
    <slot />
  </a>
</template>

<script>
/* global cordova */

export default {
  props: {
    to: { type: [String, Object], required: true },
  },
  computed: {
    isLinkOnSameHost() {
      return (
        typeof this.to === 'object' ||
        new URL(this.to, window.location).host === window.location.host
      );
    },
    useRouterLink() {
      return this.$options.components.RouterLink && this.isLinkOnSameHost;
    },
    target() {
      return this.isLinkOnSameHost ? '_self' : '_blank';
    },
  },
  methods: {
    clickHandler(event) {
      if (process.env.VUE_APP_CORDOVA && this.target === '_blank') {
        cordova.InAppBrowser.open(this.to, '_system');
        event.preventDefault();
      }
    },
  },
};
</script>
