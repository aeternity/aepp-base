<template>
  <ButtonPlain
    class="ae-toolbar-button"
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
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.ae-toolbar-button {
  margin-left: rem(20px);
  font-family: $font-sans;
  font-size: rem(11px);
  font-weight: 500;
  letter-spacing: rem(1.1px);
  text-transform: uppercase;
  color: $color-neutral-negative-1;

  /deep/ .icon {
    height: rem(14px);
    vertical-align: -.2em;
  }
}
</style>
