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
    getNewCursor: {
      type: Function,
      default: (a, b) => this.formatDisplayValue(a.slice(0, b)).length,
    },
  },
  data: () => ({
    emitValuePromise: null,
  }),
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.handleInput,
      };
    },
  },
  methods: {
    handleInput() {
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
      const emitValue = this.formatEmitValue(newValue);
      if (emitValue.then) {
        this.$emit('input', newValue);
        if (this.emitValuePromise) this.emitValuePromise.cancel();
        this.emitValuePromise = emitValue;
        emitValue.then(v => this.$emit('input', v));
      } else {
        this.$emit('input', emitValue);
      }
    },
  },
};
</script>
