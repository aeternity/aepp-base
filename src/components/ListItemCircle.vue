<template>
  <div :class="['list-item-circle', hasIcon && 'has-icon']">
    <slot />
  </div>
</template>

<script>
import { get } from 'lodash-es';

export default {
  computed: {
    hasIcon() {
      return get(this.$slots.default, '[0].tag', '') === 'svg'
        && get(this.$slots.default, '[0].data.staticClass', '').includes('icon');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/functions';

.list-item-circle {
  border-radius: 50%;
  height: rem(32px);
  line-height: rem(32px);
  width: rem(32px);
  background-color: $color-primary;
  box-shadow: 0 0 rem(16px) $color-shadow-alpha-15;
  text-align: center;
  color: #fff;

  &.has-icon {
    font-size: 0;
  }

  .icon {
    height: rem(15px);
  }
}
</style>
