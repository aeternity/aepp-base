<template>
  <DetailsItem class="details-field">
    <DetailsRow :class="{ 'not-last': $slots.default }">
      <span class="name">
        {{ name }}
      </span>
      <span
        class="value"
        :class="{ monospace: valueMonospace }"
      >
        {{ value }}
        <slot name="value" />
      </span>
    </DetailsRow>
    <slot />
  </DetailsItem>
</template>

<script>
import DetailsItem from './DetailsItem.vue';
import DetailsRow from './DetailsRow.vue';

export default {
  components: { DetailsItem, DetailsRow },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    valueMonospace: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/typography';

.details-field .details-row {
  @extend %face-sans-xs;

  &.not-last {
    margin-bottom: rem(8px);
  }

  .name {
    font-weight: 500;
    color: var(--color-secondary, rgba($color-neutral-maximum, 0.66846));
  }

  .value {
    font-weight: 600;
    color: var(--color-primary, $color-neutral-maximum);

    &.monospace {
      @extend %face-mono-xs;
    }
  }
}
</style>
