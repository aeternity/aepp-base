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
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.ae-address-panel {
  width: functions.rem(400px);
  background-color: variables.$color-neutral-positive-3;
  padding: functions.rem(10px) functions.rem(18px);
  border-radius: functions.rem(4px);

  .title {
    margin-bottom: functions.rem(8px);
    @extend %face-sans-xs;
    color: variables.$color-focus;
  }

  .ae-address {
    color: variables.$color-neutral-negative-1;
  }
}
</style>
