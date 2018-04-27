import { mapState } from 'vuex'
import { AeAppIcon, AeButton, AeIcon, AeNotification, AeModalLight, AeHeader } from '@aeternity/aepp-components'
import { DEFAULT_ICON, appsRegistry } from '@/lib/appsRegistry'

export default {
  name: 'apps',
  data () {
    return {
      editModeActive: false,
      editModeTmOut: null,
      removeAppIndex: -1
    }
  },
  computed: mapState({
    apps: state => state.apps.map(app => ({
      icon: DEFAULT_ICON,
      ...app,
      ...appsRegistry[app]
    }))
  }),
  watch: {
    editModeActive (active) {
      if (active) {
        this.$store.dispatch('setNotification', {
          text: 'You\'re now removing æpps',
          autoClose: true
        })
      }
    }
  },
  methods: {
    remove () {
      this.$store.commit('removeApp', this.removeAppIndex)
      this.removeAppIndex = -1
    },
    editMode (action = null) {
      if (action === 'cancel') return clearTimeout(this.editModeTmOut)
      this.editModeTmOut = setTimeout(() => { this.editModeActive = true }, 1000)
    }
  },
  components: {
    AeAppIcon,
    AeIcon,
    AeButton,
    AeNotification,
    AeModalLight,
    AeHeader
  }
}
