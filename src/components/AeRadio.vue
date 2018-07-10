<template>
  <label class="ae-radio">
    <input
      :name="name"
      :value="value"
      :checked="checked"
      type="radio"
      @change="$emit('change')"
    >
    <span class="wrapper">
      <span class="indicator" />
    </span>
  </label>
</template>

<script>
export default {
  props: {
    name: { type: String, default: '' },
    value: { type: [String, Number, Boolean], default: '' },
    checked: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
@import "~@aeternity/aepp-components/dist/variables.scss";

.ae-radio {
  input {
    display: none;

    &:checked + .wrapper .indicator {
      background-color: $maegenta;
    }
  }

  .wrapper {
    border: 2px solid $silver;
    border-radius: 30px;
    display: inline-block;
    cursor: pointer;
    background-color: $white;

    .indicator {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 8px;
      margin: 4px;
      transition: background-color 300ms;
    }
  }
}
</style>
