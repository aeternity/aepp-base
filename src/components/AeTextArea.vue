<template>
  <div
    :class="{ focus, error }"
    class="ae-input-container"
  >
    <div class="ae-input-box">
      <div
        v-if="label"
        class="ae-input-header"
      >
        <label
          :for="id"
          class="ae-input-label"
        >
          {{ label }}
        </label>
        <slot name="header" />
      </div>
      <textarea
        ref="textarea"
        :id="id"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        :class="{ aemount, monospace }"
        class="ae-input"
        rows="3"
        @focus="focus = true"
        @blur="focus = false"
        @input="$emit($event.type, $event.target.value)"
      />
    </div>
    <slot name="footer" />
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    value: {
      type: [String, Number],
      default: undefined,
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: undefined,
    },
    aemount: {
      type: Boolean,
      default: false,
    },
    aeddress: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    monospace: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return { focus: false };
  },
};
</script>
<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/mixins.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/animations.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.ae-input-container {
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  transition: all $base-transition-time;

  &.focus, &.error {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &.focus {
    border-left: 2px solid $color-focus;
    caret-color: $color-focus;
  }
  &.focus .ae-input-label {
    color: $color-focus;
  }
  &.error {
    border-left: 2px solid $color-error;
    caret-color: $color-error;
  }
  &.error .ae-input-label {
    color: $color-error;
  }

  &.focus .ae-input-label:after,
  &.error .ae-input-label:after {
    content: '*';
  }
}

.ae-input-box {
  display: flex;
  flex-direction: column;
  background: $color-neutral-positive-3;
  min-height: 4rem;
}

.ae-input-header {
  position: relative;
  display: flex;
  flex: 0 0;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
  width: 100%;
  padding: 0.5rem 1rem 0 1rem;
}

.ae-input-label {
  @extend %face-sans-xs;

  color: $color-neutral-negative-1;
}

.ae-input {
  @extend %face-sans-base;
  @include placeholder-color($color-neutral-negative-1);

  align-self: center;
  flex: 0 1 100%;
  width: 100%;
  margin-bottom: rem(5px);
  padding: 0.7rem 1rem;
  background: transparent;
  border: none;
  outline: none;

  &.monospace {
    @extend %face-mono-base;
    font-weight: 500;
    color: $color-neutral-negative-1;
  }
}

.ae-input.aemount {
  @extend %face-mono-xl;

  text-align: center;
  font-weight: 300;
}
</style>
