<template>
  <Component
    :is="to ? 'ae-link' : 'button'"
    :to="to"
    class="button-plain"
    @click="$emit('click', $event)"
  >
    <slot />
  </Component>
</template>

<script>
import { AeLink } from '@aeternity/aepp-components';

export default {
  components: { AeLink },
  props: {
    to: { type: [String, Object], default: null },
  },
};
</script>

<style lang="scss" scoped>
.button-plain {
  display: inline-block;
  border: none;
  background: transparent;
  padding: 0;
  text-decoration: none;
  text-align: center;
  font: inherit;
  cursor: pointer;

  &:focus:not([data-focus-visible-added]) {
    outline: none;
  }
}
</style>
