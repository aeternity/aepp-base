<template>
  <confirm-modal-item class="confirm-modal-field">
    <confirm-modal-row :class="{ 'not-last': $slots.default }">
      <span class="name">
        {{ name }}
      </span>
      <span class="value">
        {{ value }}
      </span>
    </confirm-modal-row>
    <slot />
  </confirm-modal-item>
</template>

<script>
import ConfirmModalItem from './ConfirmModalItem.vue';
import ConfirmModalRow from './ConfirmModalRow.vue';

export default {
  components: { ConfirmModalItem, ConfirmModalRow },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.confirm-modal-field {
  .confirm-modal-row {
    &.not-last {
      margin-bottom: rem(8px);
    }

    .name {
      @extend %face-sans-xs;
      font-weight: 500;
      color: $color-primary-positive-3;
    }

    .value {
      @extend %face-mono-xs;
      color: $color-neutral-maximum;
      text-transform: uppercase;
    }
  }
}
</style>
