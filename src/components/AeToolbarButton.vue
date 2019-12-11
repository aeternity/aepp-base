<template>
  <ButtonPlain
    class="ae-toolbar-button"
    :class="{ active }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </ButtonPlain>
</template>

<script>
import ButtonPlain from './ButtonPlain.vue';

export default {
  components: { ButtonPlain },
  props: { active: Boolean },
};
</script>

<style lang="scss" scoped>
@import '../styles/functions';

.ae-toolbar-button {
  margin-left: rem(20px);
  font-family: $font-sans;
  font-size: rem(11px);
  font-weight: 500;
  letter-spacing: rem(1.1px);
  text-transform: uppercase;
  color: $color-neutral-negative-1;

  &.active {
    color: #000;
  }

  ::v-deep .icon {
    height: rem(14px);
    vertical-align: -.2em;
  }
}
</style>
