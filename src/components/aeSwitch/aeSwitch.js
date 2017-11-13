export default {
  name: 'ae-switch',
  props : [
    'name',
    'choices',
    'default',
  ],
  data() {
    return {
      selected: null,
    }
  },
  watch : {
    selected(newSelected) {
      this.$emit('input', newSelected)
    }
  },
  mounted() {
    if(this.default) {
      this.selected = this.default
    } else if(this.choices.length) {
      this.selected = this.choices[0].value
    }
  }
}
