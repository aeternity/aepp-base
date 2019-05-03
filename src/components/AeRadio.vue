<template>
  <label class="ae-radio">
    <input
      :name="name"
      :value="value"
      :checked="checked"
      :type="checkbox? 'checkbox' : 'radio'"
      @change="$emit('change')"
    >
    <AeIcon
      slot="right"
      face="round"
      name="check"
    />
  </label>
</template>

<script>
import { AeIcon } from '@aeternity/aepp-components-3';

export default {
  components: { AeIcon },
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

    &:checked + .ae-icon {
      width: rem(24px);
      height: rem(24px);
      background-color: $color-primary;
      border: none;
    }
  }

  .ae-icon {
    width: rem(20px);
    height: rem(20px);
    font-size: rem(14px);
    background-color: $color-neutral-maximum;
    border: 2px solid $color-neutral-positive-1;
    box-shadow: 0 0 rem(4px) $color-shadow-alpha-15;
    transition: background-color 300ms;
  }
}
</style>
