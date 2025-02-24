<template>
  <span class="ae-fraction">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
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
.ae-fraction {
  font-weight: 500;
  font-size: 0.9em;
  font-feature-settings: 'frac' 1;
}
</style>
