<template>
  <div class="note">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.note {
  margin-bottom: rem(50px);
  @extend %face-sans-xs;
  line-height: 1.46;
  color: $color-neutral-minimum;
}
</style>
