import { createHOC } from 'vue-hoc';

export default (
  Component,
  { formatDisplayValue, formatDisplayValueAndCursor, formatEmitValue = v => v },
) => createHOC(
  Component, {
    props: {
      value: { type: String, default: '' },
    },
    data() {
      return { previousValue: this.value };
    },
    methods: {
      formatDisplayValueAndCursor({ value, cursor = 0 }) {
        const state = (formatDisplayValueAndCursor && formatDisplayValueAndCursor
          .call(this, { value, cursor }, this.previousValue))
          || (formatDisplayValue && {
            value: formatDisplayValue.call(this, value),
            cursor: formatDisplayValue.call(this, value.slice(0, cursor)).length,
          })
          || { value, cursor };
        this.previousValue = state.value;
        return state;
      },
      formatEmitValue,
    },
  }, {
    props: {
      value() {
        return this.formatDisplayValueAndCursor({ value: this.value }).value;
      },
    },
    listeners: {
      input() {
        const el = this.$children[0].$el;
        const input = el.querySelector('input') || el.querySelector('textarea');
        const { selectionStart: cursor, value } = input;

        const {
          value: newValue,
          cursor: newCursor,
        } = this.formatDisplayValueAndCursor({ value, cursor });
        if (newValue !== value) {
          input.value = newValue;
          const setSelection = () => input.setSelectionRange(newCursor, newCursor);
          setSelection();
          setTimeout(setSelection, 0);
        }
        this.$emit('input', formatEmitValue(newValue));
      },
    },
  },
);
