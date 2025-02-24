<template>
  <AeInputWrapper class="ae-input" v-bind="$attrs">
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />
    <input
      :id="id"
      v-focus.lazy="autofocus"
      slot-scope="{ setFocus, id }"
      :value="value"
      v-bind="$attrs"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @input="$emit('input', $event.target.value)"
    />
  </AeInputWrapper>
</template>

<script>
import { focus } from 'vue-focus';
import AeInputWrapper from './AeInputWrapper.vue';

export default {
  components: { AeInputWrapper },
  directives: { focus },
  props: {
    value: { type: String, default: '' },
    autofocus: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.ae-input input {
  display: block;
  width: 100%;
  margin: functions.rem(1px) 0 functions.rem(7px) 0;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  @extend %face-sans-base;
  color: variables.$color-neutral-negative-3;

  &::placeholder {
    color: variables.$color-neutral-negative-1;
  }
}
</style>
