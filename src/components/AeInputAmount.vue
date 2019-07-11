<template>
  <AeInputWrapper
    class="ae-input-amount"
    v-bind="$attrs"
  >
    <slot
      v-for="slot in Object.keys($slots)"
      :slot="slot"
      :name="slot"
    />
    <input
      :id="id"
      v-focus.lazy="autofocus"
      slot-scope="{ setFocus, id }"
      placeholder="0.0"
      autocomplete="off"
      :value="value"
      v-bind="$attrs"
      type="number"
      step="any"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @input="$emit('input', $event.target.value)"
    >
  </AeInputWrapper>
</template>

<script>
import { focus } from 'vue-focus';
import AeInputWrapper from './AeInputWrapper.vue';

export default {
  components: { AeInputWrapper },
  directives: { focus },
  props: {
    value: { type: [String, Number], default: '' },
    autofocus: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables/colors.scss';
@import '../styles/placeholders/typography.scss';

.ae-input-amount input {
  display: block;
  width: 100%;
  margin: 0 0 rem(16px) 0;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  -moz-appearance: textfield;
  @extend %face-mono-xl;
  text-align: center;
  font-weight: 300;
  color: $color-neutral-negative-3;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &::placeholder {
    color: $color-neutral;
  }
}
</style>
