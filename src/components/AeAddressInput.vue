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
      return this.formatAddress(this.value).address;
    },
  },
  methods: {
    handleInput() {
      const { textarea } = this.$children[0].$refs;
      const { selectionStart, value } = textarea;

      const { address, cursor } = this.formatAddress(value, selectionStart);
      if (address !== value) {
        textarea.value = address;
        const setSelection = () => textarea.setSelectionRange(cursor, cursor);
        setSelection();
        setTimeout(setSelection, 0);
      }
      this.$emit('input', address.replace(/[ \n]/g, ''));
    },
    formatAddress(address, cursor = address.length) {
      if (['', 'a', 'ak'].includes(address)) return { address, cursor };

      const [beginUnprefixed, end] = [[address.startsWith('ak_') ? 3 : 0, cursor], [cursor]]
        .map(args => address.slice(...args).replace(/[^1-9A-HJ-NP-Za-km-z]/g, ''));

      const begin = `ak_${beginUnprefixed}`;

      const splitBy = 3;
      const addSpaces = (addressPart, firstLength) => {
        const fl = firstLength || splitBy;
        const res = [];
        let i = -1;
        const group = () => (i >= 0
          ? addressPart.slice((splitBy * i) + fl, (splitBy * (i + 1)) + fl)
          : addressPart.slice(0, fl));
        while (group() !== '') {
          res.push(group());
          i += 1;
        }
        return [res.join(' '), res.length ? res[res.length - 1].length : 0];
      };

      const [beginS, lastLength] = addSpaces(begin);
      const [endS] = addSpaces(end, splitBy - lastLength);

      const res = `${beginS}${endS && lastLength === splitBy ? ' ' : ''}${endS}`.slice(0, 70);

      return { address: res, cursor: beginS.length };
    },
  },
};
</script>
