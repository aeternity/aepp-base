export default {
  name: 'ae-button',
  props: {
    role: {
      type: String,
      default: 'standard'
    }
  },
  computed: {
    className () {
      const defaultValue = 'ae-button'
      if (typeof this.role === 'string') {
        switch (this.role.trim()) {
          case 'primary':
            return defaultValue + ' _role_primary'
          case 'sub-primary':
            return defaultValue + ' _role_sub-primary'
          case 'standard':
          default:
            return defaultValue
        }
      } else {
        return defaultValue
      }
    }
  }
}
