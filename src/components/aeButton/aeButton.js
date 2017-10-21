export default {
  name: 'ae-button',
  props: {
    primary: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className () {
      return this.primary ? 'pink ae-button' : 'ae-button'
    }
  }
}
