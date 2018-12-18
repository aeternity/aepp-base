<template>
  <ae-textarea
    v-remove-spaces-on-copy
    :value="formattedValue"
    :label="label"
    :placeholder="placeholder"
    :error="error"
    class="ae-address-input"
    type="textarea"
    monospace
    @input="handleInput"
  >
    <template slot="footer">
      <slot name="footer" />
    </template>
  </ae-textarea>
</template>

<script>
import { directives } from '@aeternity/aepp-components-3';
import AeTextarea from './AeTextArea.vue';

export default {
  directives: {
    removeSpacesOnCopy: directives.removeSpacesOnCopy,
  },
  components: { AeTextarea },
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formattedValue() {
      return this.formatAddress(this.value);
    },
  },
  methods: {
    handleInput() {
      const { textarea } = this.$children[0].$refs;
      const { selectionStart, value } = textarea;

      const address = this.formatAddress(value);
      if (address !== value) {
        textarea.value = address;
        const cursor = this.getNewCursor(value, selectionStart);
        const setSelection = () => textarea.setSelectionRange(cursor, cursor);
        setSelection();
        setTimeout(setSelection, 0);
      }
      this.$emit('input', address.replace(/[ \n]/g, ''));
    },
    formatAddress(address) {
      if (['', 'a', 'ak'].includes(address)) return address;

      const res = address
        .slice(address.startsWith('ak_') ? 3 : 0)
        .replace(/[^1-9A-HJ-NP-Za-km-z]/g, '');

      return `ak_${res}`
        .match(/.{1,3}/g)
        .join(' ')
        .slice(0, 70);
    },
    getNewCursor(address, cursor) {
      return this.formatAddress(address.slice(0, cursor)).length;
    },
  },
};
</script>
