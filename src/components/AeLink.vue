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
  >
    <slot />
  </a>
</template>

<script>
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
};
</script>
