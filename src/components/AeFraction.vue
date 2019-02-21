<template>
  <span class="ae-fraction">
    {{ numerator }}&frasl;{{ denominator }}
  </span>
</template>

<script>
export default {
  props: {
    numerator: {
      type: [Number, String],
      required: true,
    },
    denominator: {
      type: [Number, String],
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.ae-fraction {
  font-weight: 500;
  font-size: .9em;
  font-feature-settings: 'frac' 1;
}
</style>
