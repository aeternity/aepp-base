<template>
  <AeTextarea
    :value="formatDisplayValue(value)"
    v-bind="$attrs"
    v-on="listeners"
  >
    <slot
      v-for="slot in Object.keys($slots)"
      :slot="slot"
      :name="slot"
    />
  </AeTextarea>
</template>

<script>
import AeTextarea from './AeTextarea.vue';

export default {
  components: { AeTextarea },
  props: {
    value: { type: String, default: '' },
    formatDisplayValue: { type: Function, required: true },
    formatEmitValue: { type: Function, default: a => a },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.handleInput,
      };
    },
  },
  methods: {
    async handleInput() {
      const textarea = this.$children[0].$el.querySelector('textarea');
      const { selectionStart, value } = textarea;

      const newValue = this.formatDisplayValue(value);
      if (newValue !== value) {
        textarea.value = newValue;
        const cursor = this.getNewCursor(value, selectionStart);
        const setSelection = () => textarea.setSelectionRange(cursor, cursor);
        setSelection();
        setTimeout(setSelection, 0);
      }
      this.$emit('input', await Promise.resolve(this.formatEmitValue(newValue)));
    },
    getNewCursor(value, cursor) {
      return this.formatDisplayValue(value.slice(0, cursor)).length;
    },
  },
};
</script>
