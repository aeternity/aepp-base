<template>
  <ae-input-wrapper
    class="ae-input"
    v-bind="$attrs"
  >
    <slot
      v-for="slot in Object.keys($slots)"
      :slot="slot"
      :name="slot"
    />
    <input
      :id="id"
      slot-scope="{ setFocus, id }"
      v-bind="$attrs"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @input="$emit('input', $event.target.value)"
    >
  </ae-input-wrapper>
</template>

<script>
import AeInputWrapper from './AeInputWrapper.vue';

export default {
  components: { AeInputWrapper },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.ae-input input {
  display: block;
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
</style>
