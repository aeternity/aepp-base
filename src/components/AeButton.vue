<template>
  <component
    :is="to ? 'ae-link' : 'button'"
    :class="cssClass"
    :to="to"
    :disabled="disabled"
    class="ae-button"
    @click="$emit('click', $event)"
  >
    <div
      v-if="$slots.icon"
      class="icon"
    >
      <!-- @slot Button icon -->
      <slot name="icon" />
    </div>
    <div
      v-if="$slots.default"
      class="label"
    >
      <!-- @slot Button content -->
      <slot />
    </div>
  </component>
</template>

<script>
import { AeLink } from '@aeternity/aepp-components';

export default {
  components: { AeLink },
  props: {
    fill: {
      type: String,
      validator: value => [
        'primary',
        'secondary',
        'neutral',
        'alternative',
      ].includes(value),
      default: 'primary',
    },
    size: {
      type: String,
      validator: value => [
        'small',
        'medium',
        'large',
      ].includes(value),
      default: 'medium',
    },
    disabled: { type: Boolean, default: false },
    invert: { type: Boolean, default: false },
    uppercase: { type: Boolean, default: true },
    plain: { type: Boolean, default: false },
    to: { type: [String, Object], default: undefined },
  },
  computed: {
    cssClass() {
      const classes = [
        `_size_${this.size}`,
        `_fill_${this.fill}`,
      ];
      if (this.uppercase) classes.push('_uppercase');
      if (this.invert) classes.push('_invert');
      if (this.disabled) classes.push('_disabled');
      if (this.plain) classes.push('_plain');
      if (this.$slots.icon) classes.push('_has-icon');
      if (this.$slots.default) classes.push('_has-label');
      return classes;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';

.ae-button {
  display: inline-block;
  border: none;
  border-radius: 100px;
  color: $color-white;
  background-color: $color-neutral;
  @extend %face-sans-xs;
  font-weight: 500;
  letter-spacing: 1.3px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.11);
  padding: 0;

  &._fill {
    &_primary {
      background-color: $color-primary;
    }
    &_secondary {
      background-color: $color-secondary;
    }
    &_neutral {
      background-color: $color-neutral-maximum;
      color: $color-black;
    }
    &_alternative {
      background-color: $color-alternative;
      color: $color-white;
    }
  }

  &._size {
    @mixin size ($buttonHeight, $fontSize, $iconSize, $labelGap) {
      height: $buttonHeight;
      line-height: $buttonHeight;
      font-size: $fontSize;

      .icon {
        width: $buttonHeight;
        color: $color-black;

        /deep/ {
          .ae-icon, img {
            width: $iconSize;
            height: $iconSize;
          }

          img {
            vertical-align: middle;
          }
        }
      }

      .label {
        padding: 0 $labelGap;
      }

      &._plain {
        .label {
          padding: 0 ($buttonHeight - $fontSize) / 2;
        }

        &._has-icon {
          .label {
            padding-left: $buttonHeight;
          }

          i {
            position: relative;
            top: $iconSize / 4;
          }
        }
      }
    }

    &_small {
      @include size(30px, 14px, 16px, 50px);
    }

    &_medium {
      @include size(56px, 13px, 24px, 10px);
    }

    &_large {
      @include size(65px, 15px, 47px, 30px);
    }
  }

  &._invert._fill {
    &_primary {
      color: $color-primary;
    }
    &_secondary {
      color: $color-secondary;
    }
    &_neutral {
      color: $color-neutral;
    }
    &_alternative {
      color: $color-alternative;
    }
  }

  &._plain {
    background-color: transparent;
    box-shadow: none;

    &._fill {
      &_primary {
        color: $color-primary;
      }
      &_secondary {
        color: $color-secondary;
      }
      &_neutral {
        color: $color-neutral-maximum;
      }
      &_alternative {
        color: $color-alternative;
      }
    }
  }

  &._uppercase {
    text-transform: uppercase;
  }

  &._has-label .icon {
    position: absolute;
  }

  .label {
    text-align: center;
  }

  &._disabled {
    background-color: $color-neutral-positive-1;
    cursor: not-allowed;
  }
}
</style>
