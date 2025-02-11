<template>
  <AePopover class="ae-menu" v-bind="$attrs" v-on="$listeners" @click.native="$emit('close')">
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
@use '../styles/functions';

.ae-menu {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 functions.rem(16px) rgba(#1b4479, 0.15);
  padding: functions.rem(12px) 0;
  min-width: auto;
}
</style>
