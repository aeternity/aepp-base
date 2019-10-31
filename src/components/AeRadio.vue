<template>
  <label class="ae-radio">
    <input
      :name="name"
      :value="value"
      :checked="checked"
      :type="checkbox ? 'checkbox' : 'radio'"
      @change="$emit('change')"
    >
    <div slot="right">
      <Check />
    </div>
  </label>
</template>

<script>
import { Check } from './icons';

export default {
  components: { Check },
  props: {
    name: { type: String, default: '' },
    value: { type: [String, Number, Boolean], default: '' },
    checked: Boolean,
    checkbox: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/functions';

.ae-radio {
  input {
    display: none;

    &:checked + div {
      background-color: $color-primary;
      border: none;
    }
  }

  > div {
    box-sizing: border-box;
    width: rem(24px);
    height: rem(24px);
    line-height: rem(24px);
    background-color: $color-neutral-maximum;
    border: 2px solid $color-neutral-positive-1;
    border-radius: 50%;
    box-shadow: 0 0 rem(4px) $color-shadow-alpha-15;
    transition: background-color 300ms;
    text-align: center;
    font-size: 0;

    .icon {
      height: rem(14px);
      color: #fff;
    }
  }
}
</style>
