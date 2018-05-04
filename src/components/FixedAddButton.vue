<template>
  <ae-button
    class="fixed-add-button"
    :class="{ 'quick-id': quickId, mobile: IS_MOBILE_DEVICE }"
    :to="to"
    @click="$emit('click')"
    type="dramatic"
  >
    <ae-icon slot="icon" name="plus" invert type="exciting" />
  </ae-button>
</template>

<script>
  import { AeButton, AeIcon } from '@aeternity/aepp-components'
  import IS_MOBILE_DEVICE from '../lib/isMobileDevice'

  export default {
    props: {
      to: [Object, String],
      'quick-id': Boolean
    },
    data: () => ({
      IS_MOBILE_DEVICE
    }),
    components: { AeButton, AeIcon }
  }
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .fixed-add-button {
    position: fixed;
    bottom: 30px;
    right: 30px;

    &:not(.mobile).quick-id {
      bottom: 80px;
    }

    &.mobile {
      @media (max-width: $screen-phone) {
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
