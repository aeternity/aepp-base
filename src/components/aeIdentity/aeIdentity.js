import aeIdentityAvatar from './../aeIdentityAvatar/aeIdentityAvatar.vue'
import aeIdentityInfo from './../aeIdentityInfo/aeIdentityInfo.vue'
import helperMixin from './../../mixins/helper'
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
      default: 'small',
      validator: function (size) {
        return size === 'small' || size === 'big'
      }
    }
  },
  mixins: [
    helperMixin
  ],
  computed: {
    amount () {
      return this.identity ? helperMixin.methods.readableEther(this.identity.balance) : 0
    },
    address () {
      return this.identity.address;
    },
    shortAddress () {
      return this.identity.address.substr(0, 6).toUpperCase();
    },
    classObject: function () {
      let classes = {
        'ae-identity': true,
        'collapsed': this.collapsed,
        '_active_yes': this.active,
        '_active_no': !this.active
      }
      classes['size_' + this.size] = true
      return classes
    }
  }
}
