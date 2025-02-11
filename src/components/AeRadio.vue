<template>
  <label class="ae-radio">
    <input
      :name="name"
      :value="value"
      :checked="checked"
      :type="checkbox ? 'checkbox' : 'radio'"
      @change="$emit('change')"
    />
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
@use '../styles/variables';
@use '../styles/functions';

.ae-radio {
  input {
    display: none;

    &:checked + div {
      background-color: variables.$color-primary;
      border: none;
    }
  }

  > div {
    box-sizing: border-box;
    width: functions.rem(24px);
    height: functions.rem(24px);
    line-height: functions.rem(24px);
    background-color: variables.$color-neutral-maximum;
    border: 2px solid variables.$color-neutral-positive-1;
    border-radius: 50%;
    box-shadow: 0 0 functions.rem(4px) variables.$color-shadow-alpha-15;
    transition: background-color 300ms;
    text-align: center;
    font-size: 0;

    .icon {
      height: functions.rem(14px);
      color: #fff;
    }
  }
}
</style>
