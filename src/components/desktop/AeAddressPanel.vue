<template>
  <div class="ae-address-panel">
    <div class="title">
      {{ title }}
    </div>
    <ae-address
      :address="address"
      split-by="9"
    />
  </div>
</template>

<script>
import AeAddress from '../AeAddress.vue';

export default {
  components: { AeAddress },
  props: {
    title: {
      type: String,
      default: 'Address',
    },
    address: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.ae-address-panel {
  width: rem(372px);
  background-color: $color-neutral-positive-3;
  padding: rem(10px) 0 rem(10px) rem(18px);
  border-radius: rem(4px);

  .title {
    margin-bottom: rem(8px);
    @extend %face-sans-xs;
    color: $color-focus;
  }

  .ae-address {
    display: block;
    color: $color-neutral-negative-1;
    font-weight: normal;
    letter-spacing: normal;
  }
}
</style>
