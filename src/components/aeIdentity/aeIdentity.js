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
    collapsed: function () {
      return this.$store.state.identityCollapsed
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
  },
  watch: {},
  methods: {
    toggle: function () {
      if (this.$store.state.appClass !== 'home') {
        this.$store.commit('identityCollapsed', !this.$store.state.identityCollapsed)
      }
    }
  }
};
