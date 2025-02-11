<template>
  <ButtonPlain v-bind="$attrs" class="list-item-button" v-on="$listeners">
    <div class="content">
      <slot />
    </div>
  </ButtonPlain>
</template>

<script>
import ButtonPlain from './ButtonPlain.vue';

export default {
  components: { ButtonPlain },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.list-item-button {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: functions.rem(44px);
  padding: 0 functions.rem(16px);
  @extend %face-uppercase-xs;
  line-height: functions.rem(44px);
  letter-spacing: 1.1px;
  text-align: center;
  font-weight: 500;
  color: variables.$color-neutral-negative-1;

  &:hover {
    background-color: variables.$color-neutral-positive-3;
  }
}

.list-item + .list-item-button .content {
  border-top: 2px solid variables.$color-neutral-positive-2;
}
</style>
