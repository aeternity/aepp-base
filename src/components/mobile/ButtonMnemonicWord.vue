<template>
  <ButtonPlain
    v-bind="$attrs"
    class="button-mnemonic-word"
    v-on="$listeners"
  >
    <slot />
    <Close v-if="iconClose" />
  </ButtonPlain>
</template>

<script>
import ButtonPlain from '../ButtonPlain.vue';
import { Close } from '../icons';

export default {
  components: { ButtonPlain, Close },
  props: {
    iconClose: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.button-mnemonic-word {
  padding: functions.rem(2px) functions.rem(7px) functions.rem(6px) functions.rem(7px);
  height: functions.rem(28px);
  background: variables.$color-neutral-positive-2;
  border: 2px solid variables.$color-neutral-positive-2;
  border-radius: functions.rem(4px);
  margin-right: functions.rem(4px);
  margin-bottom: functions.rem(4px);
  @extend %face-mono-s;
  color: variables.$color-neutral-negative-3;

  &[disabled] {
    background: #fff;
    border-color: variables.$color-neutral-positive-3;
    cursor: not-allowed;
    color: variables.$color-neutral-positive-1;
  }

  .icon {
    height: functions.rem(12px);
  }
}
</style>
