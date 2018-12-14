<template>
  <ae-button
    :class="{ 'quick-id': quickId, mobile: $globals.IS_MOBILE_DEVICE }"
    :to="to"
    class="fixed-add-button"
    type="dramatic"
    @click="$emit('click')"
  >
    <ae-icon
      slot="icon"
      name="plus"
      invert
      type="exciting"
    />
  </ae-button>
</template>

<script>
import { AeButton, AeIcon } from '@aeternity/aepp-components';

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

.fixed-add-button {
  position: fixed;
  bottom: 30px;
  right: 30px;

  &:not(.mobile).quick-id {
    bottom: 80px;
  }

  &.mobile {
    @include phone {
      right: 10px;
    }

    &.quick-id {
      @media (max-width: 600px) {
        bottom: 110px;
      }
    }
  }
}
</style>
