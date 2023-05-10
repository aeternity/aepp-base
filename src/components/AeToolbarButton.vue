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
@use '../styles/variables';
@use '../styles/functions';

.ae-toolbar-button {
  margin-left: functions.rem(20px);
  font-family: variables.$font-sans;
  font-size: functions.rem(11px);
  font-weight: 500;
  letter-spacing: functions.rem(1.1px);
  text-transform: uppercase;
  color: variables.$color-neutral-negative-1;

  &.active {
    color: #000;
  }

  ::v-deep .icon {
    height: functions.rem(14px);
    vertical-align: -.2em;
  }
}
</style>
