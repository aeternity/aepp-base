const aeButtonTypes = ['plain', 'boring', 'normal', 'exciting', 'dramatic']
const aeButtonSizes = ['smaller', 'small', 'medium', 'large']

export default {
  name: 'ae-button',
  props: {
    /**
     * Type of button, possible values: 'plain', 'boring', 'normal', 'exciting', 'dramatic'
     */
    type: {
      type: String,
      validator: value => {
        return aeButtonTypes.find(e => e === value)
      },
      default: 'normal'
    },
    /**
     * Size of button, possible values: 'smaller', 'small', 'medium', 'large'
     */
    size: {
      type: String,
      validator: value => {
        return aeButtonSizes.find(e => e === value)
      },
      default: 'medium'
    },
    btnBlock: {
      type: Boolean,
      default: false
    },
    inactive: {
      type: Boolean,
      default: false
    },
    invert: {
      type: Boolean,
      default: false
    },
    uppercase: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },
    hasLabel () {
      return this.hasDefaultSlot
    },
    sizeModifier () {
      return `_size_${this.size}`
    },
    typeModifier () {
      return `_type_${this.type}`
    },
    activeModifier () {
      return `_active_${!this.inactive}`
    },
    hasLabelModifier () {
      return `_has-label_${this.hasLabel}`
    },
    invertModifier () {
      return `_invert_${this.invert}`
    },
    btnBlockModifier () {
      return `_btn-block_${this.btnBlock}`
    },
    uppercaseModifier () {
      return `_uppercase_${this.uppercase}`
    },
    cssClass () {
      return [
        this.sizeModifier,
        this.typeModifier,
        this.activeModifier,
        this.hasLabelModifier,
        this.invertModifier,
        this.btnBlockModifier,
        this.uppercaseModifier
      ]
    }
  }
}
