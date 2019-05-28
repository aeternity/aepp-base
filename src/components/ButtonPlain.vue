<template>
  <Component
    :is="!disabled && to ? 'AeLink' : 'button'"
    :to="to"
    :disabled="disabled"
    class="button-plain"
    @click="$emit('click', $event)"
  >
    <slot />
  </Component>
</template>

<script>
import AeLink from './AeLink.vue';

export default {
  components: { AeLink },
  props: {
    to: { type: [String, Object], default: null },
    disabled: { type: Boolean },
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
  color: inherit;
  cursor: pointer;

  &:focus:not([data-focus-visible-added]) {
    outline: none;
  }

  &[disabled] {
    cursor: not-allowed;
  }
}
</style>
