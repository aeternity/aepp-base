<template>
  <div class="ae-address-panel">
    <div class="title">
      {{ title }}
    </div>
    <AeAddress
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
      default() { return this.$t('components.address-panel.title-default'); },
    },
    address: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.ae-address-panel {
  width: rem(400px);
  background-color: $color-neutral-positive-3;
  padding: rem(10px) rem(18px);
  border-radius: rem(4px);

  .title {
    margin-bottom: rem(8px);
    @extend %face-sans-xs;
    color: $color-focus;
  }

  .ae-address {
    color: $color-neutral-negative-1;
  }
}
</style>
