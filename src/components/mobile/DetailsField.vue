<template>
  <DetailsItem class="details-field">
    <DetailsRow :class="[{ 'not-last': $slots.default }, fill]">
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
import DetailsFillMixin from './DetailsFillMixin';

export default {
  components: { DetailsItem, DetailsRow },
  mixins: [DetailsFillMixin],
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
    }

    .value {
      @extend %face-mono-xs;
      text-transform: uppercase;
    }

    &.neutral {
      .name {
        color: rgba(255, 255, 255, 0.66846);
      }

      .value {
        color: $color-neutral-maximum;
      }
    }

    &.dark {
      .name {
        color: $color-neutral-negative-1;
      }

      .value {
        color: $color-neutral-negative-3;
      }
    }
  }
}
</style>
