<template>
  <AeTextareaFormatted
    class="ae-input-mnemonic"
    :header="$t('recover.mnemonic')"
    rows="3"
    submit-on-enter
    :format-display-value="formatDisplayMnemonic"
    :format-emit-value="formatEmitMnemonic"
    v-bind="$attrs"
    :value="value"
    autocorrect="off"
    autocapitalize="off"
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
