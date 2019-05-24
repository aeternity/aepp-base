<template>
  <label class="ae-radio">
    <input
      :name="name"
      :value="value"
      :checked="checked"
      :type="checkbox? 'checkbox' : 'radio'"
      @change="$emit('change')"
    >
    <span slot="right">
      <Check />
    </span>
  </label>
</template>

<script>
import { Check } from './icons';

export default {
  components: { Check },
  props: {
    name: { type: String, default: '' },
    value: { type: [String, Number, Boolean], default: '' },
    checked: { type: Boolean, default: false },
    checkbox: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.ae-radio {
  input {
    display: none;

    &:checked + span {
      background-color: $color-primary;
      border: none;
    }
  }

  > span {
    box-sizing: border-box;
    display: inline-block;
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
