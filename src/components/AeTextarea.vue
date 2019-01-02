<template>
  <ae-input-wrapper
    class="ae-textarea"
    v-bind="$attrs"
  >
    <slot
      v-for="slot in Object.keys($slots)"
      :slot="slot"
      :name="slot"
    />
    <textarea
      :id="id"
      v-focus.lazy="autofocus"
      slot-scope="{ setFocus, id }"
      v-bind="$attrs"
      :class="{ monospace }"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @input="$emit('input', $event.target.value)"
    />
  </ae-input-wrapper>
</template>

<script>
import { focus } from 'vue-focus';
import AeInputWrapper from './AeInputWrapper.vue';

export default {
  components: { AeInputWrapper },
  directives: { focus },
  props: {
    autofocus: { type: Boolean, default: false },
    monospace: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.ae-textarea textarea {
  display: block;
  width: 100%;
  margin: rem(10px) 0 rem(14px) 0;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  @extend %face-sans-base;
  color: $color-neutral-negative-1;

  &.monospace {
    @extend %face-mono-base;
    font-weight: 500;
  }

  &::placeholder {
    color: $color-neutral;
    font-weight: normal;
  }
}
</style>
