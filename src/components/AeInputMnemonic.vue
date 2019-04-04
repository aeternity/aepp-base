<template>
  <AeTextareaFormatted
    class="ae-input-mnemonic"
    header="Recovery phrase"
    rows="3"
    :format-display-value="formatDisplayMnemonic"
    :format-emit-value="formatEmitMnemonic"
    v-bind="$attrs"
    :value="value"
    v-on="$listeners"
  />
</template>

<script>
import AeTextareaFormatted from './AeTextareaFormatted.vue';

export default {
  components: { AeTextareaFormatted },
  props: {
    value: { type: String, required: true },
  },
  methods: {
    formatDisplayMnemonic: mnemonic => mnemonic
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[^a-z ]/g, ''),
    formatEmitMnemonic: mnemonic => mnemonic.trim(),
  },
};
</script>
