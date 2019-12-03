<template>
  <AeInputWrapper
    class="ae-input-name"
    v-bind="$attrs"
  >
    <slot
      v-for="slot in Object.keys($slots)"
      :slot="slot"
      :name="slot"
    />
    <div
      slot-scope="{ setFocus, id }"
      class="labeled-input"
    >
      <input
        :id="id"
        v-focus.lazy="autofocus"
        :value="formatDisplayValue(value)"
        v-bind="$attrs"
        @focus="setFocus(true)"
        @blur="setFocus(false)"
        @input="$emit('input', formatEmitValue($event.target.value))"
      >
      <label>
        {{ AENS_DOMAIN }}
      </label>
    </div>
  </AeInputWrapper>
</template>

<script>
import { focus } from 'vue-focus';
import AeInputWrapper from './AeInputWrapper.vue';
import { AENS_DOMAIN } from '../lib/constants';

export default {
  components: { AeInputWrapper },
  directives: { focus },
  props: {
    value: { type: String, default: '' },
    autofocus: Boolean,
  },
  data: () => ({
    AENS_DOMAIN,
  }),
  methods: {
    formatDisplayValue(value) {
      if (value.endsWith(AENS_DOMAIN)) return value.slice(0, -6);
      return value;
    },
    formatEmitValue(value) {
      if (value.endsWith(AENS_DOMAIN)) return value;
      return value + AENS_DOMAIN;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/typography';

.ae-input-name .labeled-input {
  display: flex;
  align-items: center;

  input {
    width: 100%;
    margin: rem(1px) 0 rem(7px) 0;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    @extend %face-sans-base;
    color: $color-neutral-negative-3;

    &::placeholder {
      color: $color-neutral-negative-1;
    }
  }

  label {
    @extend %face-sans-base;
    margin: 0;
  }
}
</style>
