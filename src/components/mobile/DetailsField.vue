<template>
  <DetailsItem class="details-field">
    <DetailsRow :class="{ 'not-last': $slots.default }">
      <span class="name">
        {{ name }}
      </span>
      <span class="value">
        {{ value }}
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
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.details-field {
  .details-row {
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
