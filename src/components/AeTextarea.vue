<template>
  <AeInputWrapper
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
      @keypress="keypressHandler"
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
    autofocus: Boolean,
    monospace: Boolean,
    submitOnEnter: Boolean,
  },
  methods: {
    keypressHandler(event) {
      if (!this.submitOnEnter || event.key !== 'Enter') return;
      event.preventDefault();
      if (event.target.form) event.target.form.dispatchEvent(new Event('submit'));
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.ae-textarea textarea {
  display: block;
  width: 100%;
  margin: functions.rem(10px) 0 functions.rem(14px) 0;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  @extend %face-sans-base;
  color: variables.$color-neutral-negative-1;

  &.monospace {
    @extend %face-mono-base;
    font-weight: 500;
  }

  &::placeholder {
    color: variables.$color-neutral;
    font-weight: normal;
  }
}
</style>
