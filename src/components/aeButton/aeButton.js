export default {
  name: 'ae-button',
  props: {
    role: {
      type: String,
      default: 'standard'
    },
    disabled: {
      type: String,
      default: false
    }
  },
  computed: {
    classObject () {
      return {
        'ae-button': true,
        '_role_primary': this.role === 'primary',
        '_role_sub-primary': this.role === 'sub-primary',
        '_disabled': this.disabled
      }
    }
  }
}
