export default {
  name: 'PinInput',
  props: {
    'id': String,
    'value': {
      type: String,
      default: ''
    }
  },
  methods: {
    handleChange (event) {
      const newValue = event.target.value
      this.$emit('change', {value: newValue})
    }
  }
}
