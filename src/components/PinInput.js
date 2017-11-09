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
      default: 'Enter Password...'
    },
    'focusOnMount' : {
      type : Boolean,
      default : false
    }
  },
  mounted() {
    if(this.focusOnMount) {
      this.$refs.input.focus()
    }
  },
  methods: {
    handleChange (event) {
      const newValue = event.target.value
      this.$emit('change', {value: newValue})
    }
  }
}
