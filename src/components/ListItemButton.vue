<template>
  <button-plain
    v-bind="$attrs"
    class="list-item-button"
    v-on="$listeners"
  >
    <div class="content">
      <slot />
    </div>
  </button-plain>
</template>

<script>
import ButtonPlain from './ButtonPlain.vue';

export default {
  components: { ButtonPlain },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.list-item-button {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: rem(44px);
  padding: 0 rem(16px);
  @extend %face-uppercase-xs;
  line-height: rem(44px);
  letter-spacing: 1.1px;
  text-align: center;
  font-weight: 500;
  color: $color-neutral-negative-1;

  &:hover {
    background-color: $color-neutral-positive-3;
  }
}

.list-item + .list-item-button .content {
  border-top: 2px solid $color-neutral-positive-2;
}
</style>
