<template>
  <AeTextareaFormatted
    class="ae-input-mnemonic"
    :header="$t('recover.mnemonic')"
    rows="3"
    submit-on-enter
    v-bind="$attrs"
    :value="value"
    autocorrect="off"
    autocapitalize="off"
    v-on="$listeners"
  />
</template>

<script>
import withFormatting from '../lib/withFormatting';
import AeTextarea from './AeTextarea.vue';

export default {
  components: {
    AeTextareaFormatted: withFormatting(AeTextarea, {
      formatDisplayValue: (value) =>
        value
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .replace(/[^a-z ]/g, ''),
      formatEmitValue: (mnemonic) => mnemonic.trim(),
    }),
  },
  props: {
    value: { type: String, required: true },
  },
};
</script>
