<template>
  <div class="add-to-home-screen-prompt">
    <p>
      Please add this app to home screen.
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/variables/colors.scss';
@import '../../styles/placeholders/typography.scss';

.add-to-home-screen-prompt {
  flex-grow: 1;
  display: flex;
  background-color: $color-primary;

  p {
    text-align: center;
    margin: auto;
    max-width: rem(250px);
    @extend %face-sans-l;
    color: $color-neutral-maximum;
  }
}
</style>
