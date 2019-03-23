<template>
  <AeButton
    :class="{ mobile: $globals.IS_MOBILE_DEVICE }"
    fill="primary"
    class="button-add-fixed"
    :to="to"
    @click="$emit('click')"
  >
    <AeIcon name="plus" />
  </AeButton>
</template>

<script>
import { AeIcon } from '@aeternity/aepp-components-3';
import AeButton from './AeButton.vue';

export default {
  components: { AeButton, AeIcon },
  props: {
    to: { type: [Object, String], default: undefined },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.mobile-page .wrapper > .button-add-fixed.ae-button.medium {
  width: rem(56px);
  margin: 0;
}

.button-add-fixed {
  position: fixed;
  right: rem(31px);
  bottom: rem(34px);
  box-shadow: 0 0 rem(8px) rgba(#1B4479, 0.1);

  &.mobile {
    right: rem(23px);
    bottom: rem(82px);
  }

  .ae-icon {
    font-size: rem(20px);
    vertical-align: middle;
  }
}
</style>
