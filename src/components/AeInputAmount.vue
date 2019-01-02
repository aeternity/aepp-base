<template>
  <ae-input-wrapper
    class="ae-input-amount"
    v-bind="$attrs"
  >
    <input
      :id="id"
      v-focus.lazy="autofocus"
      slot-scope="{ setFocus, id }"
      placeholder="0.0"
      :value="value"
      v-bind="$attrs"
      type="number"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @input="$emit('input', $event.target.value)"
    >
  </ae-input-wrapper>
</template>

<script>
import { focus } from 'vue-focus';
import AeInputWrapper from './AeInputWrapper.vue';

export default {
  components: { AeInputWrapper },
  directives: { focus },
  props: {
    value: { type: [String, Number], default: '' },
    autofocus: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

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
