<template>
  <DetailsItem class="details-permission">
    <div class="name">
      {{ name }}
    </div>
    <div class="description">
      <slot />
    </div>
  </DetailsItem>
</template>

<script>
import DetailsItem from './DetailsItem.vue';

export default {
  components: { DetailsItem },
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

.details-permission {
  @extend %face-sans-s;

  .name {
    font-weight: 500;
    color: var(--color-primary, $color-neutral-maximum);
  }

  .description {
    color: var(--color-secondary, rgba($color-neutral-maximum, 0.66846));
  }
}
</style>
