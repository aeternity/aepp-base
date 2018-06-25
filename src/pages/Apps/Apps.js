import { mapState, mapGetters } from 'vuex'
import { AeAppIcon, AeButton, AeIcon, AeNotification, AeModalLight } from '@aeternity/aepp-components'
import { DEFAULT_ICON, appsRegistry } from '../../lib/appsRegistry'
import HeaderDesktop from '../../components/HeaderDesktop'
import HeaderMobile from '../../components/HeaderMobile'

export default {
  name: 'apps',
  data () {
    return {
      editModeActive: false,
      editModeTmOut: null,
      removeAppIndex: -1
    }
  },
  computed: {
    ...mapState({
      apps: state => state.apps.map(app => ({
        icon: DEFAULT_ICON,
        ...app,
        ...appsRegistry[app]
      }))
    }),
    ...mapGetters(['loggedIn'])
  },
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
      if (!this.loggedIn) return
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
    HeaderDesktop,
    HeaderMobile
  }
}
