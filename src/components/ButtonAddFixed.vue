<template>
  <AeButton
    :class="{ 'quick-id': quickId, mobile: $globals.IS_MOBILE_DEVICE }"
    fill="primary"
    class="button-add-fixed"
    :to="to"
    @click="$emit('click')"
  >
    <AeIcon
      name="plus"
      face="round"
      fill="primary"
    />
  </AeButton>
</template>

<script>
import { AeIcon } from '@aeternity/aepp-components-3';
import AeButton from './AeButton.vue';

export default {
  components: { AeButton, AeIcon },
  props: {
    to: { type: [Object, String], default: undefined },
    quickId: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/mixins.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.mobile-page .button-add-fixed.ae-button.medium {
  width: rem(56px);
}

.button-add-fixed {
  position: fixed;
  bottom: 0px;
  right: 30px;

  .ae-icon {
    transform: scale(1.4);
    box-shadow: 0 0;
  }

  &.mobile.quick-id {
      bottom: 70px;
  }
}
</style>
