<template>
  <AeButton
    :class="{ mobile: $globals.ENV_MOBILE_DEVICE }"
    fill="primary"
    class="button-add-fixed"
    :to="to"
    @click="$emit('click')"
  >
    <Plus />
  </AeButton>
</template>

<script>
import AeButton from './AeButton.vue';
import { Plus } from './icons';

export default {
  components: { AeButton, Plus },
  props: {
    to: { type: [Object, String], default: undefined },
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/functions';

.page .wrapper > .button-add-fixed.ae-button.medium {
  width: functions.rem(56px);
  margin: 0;
}

.button-add-fixed {
  position: fixed;
  right: functions.rem(31px);
  bottom: functions.rem(34px);
  box-shadow: 0 0 functions.rem(8px) rgba(#1b4479, 0.1);

  &.mobile {
    right: functions.rem(23px);
    bottom: functions.rem(82px);
    bottom: calc(#{functions.rem(82px)} + env(safe-area-inset-bottom));
  }
}
</style>
