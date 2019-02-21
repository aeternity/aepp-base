<template>
  <AeTextareaFormatted
    class="ae-input-mnemonic"
    header="Recovery phrase"
    rows="3"
    :format-display-value="formatMnemonic"
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
    formatMnemonic: address => address
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[^a-z ]/g, ''),
  },
};
</script>
