<template>
  <RouterLink
    v-if="useRouterLink"
    class="ae-link"
    :to="to"
  >
    <slot />
  </RouterLink>
  <a
    v-else
    class="ae-link"
    :href="to"
    :target="isLinkOnSameHost ? '_self' : '_blank'"
    @click="clickHandler"
  >
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
      return typeof this.to === 'object'
        || (new URL(this.to, window.location)).host === window.location.host;
    },
    useRouterLink() {
      return this.$options.components.RouterLink && this.isLinkOnSameHost;
    },
  },
  methods: {
    clickHandler(event) {
      const { target, href } = event.target;
      if (process.env.VUE_APP_CORDOVA && target === '_blank') {
        cordova.InAppBrowser.open(href, '_system');
        event.preventDefault();
      }
    },
  },
};
</script>
