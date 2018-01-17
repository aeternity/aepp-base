const blockies = require('ethereum-blockies-png')
const aeAvatarSizes = ['small', 'medium', 'large']

export default {
  name: 'avatar',
  props: {
    address: {
      type: String
    },
    size: {
      type: String,
      validator: value => aeAvatarSizes.find(e => e === value),
      default: 'medium'
    }
  },
  methods: {
    blockie (address) {
      return blockies.createDataURL({
        seed: address
      })
    }
  },
  computed: {
    style: function () {
      if (this.address) {
        return {
          backgroundImage: "url('" + this.blockie(this.address) + "')"
        }
      } else {
        return {
          backgroundColor: '#d1d1d1'
        }
      }
    },
    sizeModifier () {
      return `_size_${this.size}`
    }
  }
}
