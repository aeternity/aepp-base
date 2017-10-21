export default {
  name: 'PinInput',
  props: {
    'id': String,
    'value': {
      type: String,
      default: ''
    },
    'placeholder': {
      type: String,
      default: 'Enter PIN...'
    }
  },
  methods: {
    handleChange (event) {
      const newValue = event.target.value
      this.$emit('change', {value: newValue})
    }
  }
}
