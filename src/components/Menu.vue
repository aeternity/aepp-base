<template>
  <AePopover
    class="menu"
    v-bind="$attrs"
    v-on="$listeners"
    @click.native="$emit('close')"
  >
    <slot />
  </AePopover>
</template>

<script>
import AePopover from './AePopover.vue';

export default {
  components: { AePopover },
};
</script>

<style lang="scss" scoped>
@import '../styles/functions';

.menu {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 rem(16px) rgba(#1B4479, 0.15);
  padding: rem(12px) 0;
  min-width: auto;
}
</style>
