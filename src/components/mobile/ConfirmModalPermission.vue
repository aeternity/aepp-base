<template>
  <ConfirmModalItem class="confirm-modal-permission">
    <div class="name">
      {{ name }}
    </div>
    <div class="description">
      <slot />
    </div>
  </ConfirmModalItem>
</template>

<script>
import ConfirmModalItem from './ConfirmModalItem.vue';

export default {
  components: { ConfirmModalItem },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.confirm-modal-permission {
  @extend %face-sans-s;

  .name {
    font-weight: 500;
    color: $color-neutral-negative-3;
  }

  .description {
    color: $color-neutral;
  }
}
</style>
