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
    <div
      slot-scope="{ setFocus, id }"
      class="unit-amount"
      :class="{ 'unit-reverse': unitReverse }"
    >
      <input
        :id="id"
        v-focus.lazy="autofocus"
        placeholder="0.0"
        autocomplete="off"
        :value="value"
        v-bind="$attrs"
        type="number"
        inputmode="decimal"
        step="any"
        @focus="setFocus(true)"
        @blur="setFocus(false)"
        @input="$emit('input', $event.target.value)"
      >
      <label
        :for="id"
        @click="$emit('unit-click')"
      >
        {{ unit }}
      </label>
    </div>
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
    unit: { type: String, default: '' },
    unitReverse: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables/colors.scss';
@import '../styles/placeholders/typography.scss';

.ae-input-amount .unit-amount {
  display: flex;
  align-items: center;

  &.unit-reverse {
    flex-direction: row-reverse;
  }

  input,
  label {
    @extend %face-mono-xl;
    margin: 0 0 rem(16px) 0;
    font-weight: 300;
  }

  input {
    width: 100%;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    -moz-appearance: textfield;
    text-align: center;
    color: $color-neutral-negative-3;

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &::placeholder {
      color: $color-neutral;
    }
  }
}
</style>
