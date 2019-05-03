<template>
  <ButtonPlain
    v-bind="$attrs"
    class="button-mnemonic-word"
    v-on="$listeners"
  >
    <slot />
    <AeIcon
      v-if="iconClose"
      name="close"
    />
  </ButtonPlain>
</template>

<script>
import { AeIcon } from '@aeternity/aepp-components-3';
import ButtonPlain from '../ButtonPlain.vue';

export default {
  components: { AeIcon, ButtonPlain },
  props: {
    iconClose: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.button-mnemonic-word {
  padding: rem(2px) rem(7px) rem(6px) rem(7px);
  height: rem(28px);
  background: $color-neutral-positive-2;
  border: 2px solid $color-neutral-positive-2;
  border-radius: rem(4px);
  margin-right: rem(4px);
  margin-bottom: rem(4px);
  @extend %face-mono-s;
  color: $color-neutral-negative-3;

  &[disabled] {
    background: $color-white;
    border-color: $color-neutral-positive-3;
    cursor: not-allowed;
    color: $color-neutral-positive-1;
  }

  .ae-icon {
    vertical-align: middle;
    font-size: rem(12px);
  }
}
</style>
