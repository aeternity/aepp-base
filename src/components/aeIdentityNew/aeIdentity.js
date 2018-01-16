import aeIdentityAvatar from './../aeIdentityAvatarNew/aeIdentityAvatar.vue'
import aeIdentityInfo from './../aeIdentityInfo/aeIdentityInfo.vue'
import helperMixin from './../../mixins/helper'

const aeIdentifySizes = ['small', 'medium', 'normal', 'large']

export default {
  name: 'ae-identity',
  components: {
    'ae-identity-avatar': aeIdentityAvatar,
    'ae-identity-info': aeIdentityInfo
  },
  data: function () {
    return {}
  },
  props: {
    identity: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: value => aeIdentifySizes.find(e => e === value),
      default: 'normal'
    }
  },
  mixins: [helperMixin],
  computed: {
    amount () {
      return this.identity
        ? helperMixin.methods.readableEther(this.identity.balance)
        : 0
    },
    cardName () {
      return this.identity.cardName
    },
    address () {
      return this.identity.address
    },
    shortAddress () {
      return this.identity.address.substr(0, 6)
    },
    classObject: function () {
      let classes = {
        'ae-identity': true,
        collapsed: this.collapsed,
        _active_yes: this.active,
        _active_no: !this.active
      }

      console.log(this.size)
      classes['size_' + this.size] = true
      return classes
    },
    hasSlot () {
      return this.$slots.default
    }
  }
}
