import { mapState, mapGetters, mapMutations } from 'vuex'
import { AeAppIcon, AeButton, AeIcon, AeNotification, AeModalLight } from '@aeternity/aepp-components'
import { DEFAULT_ICON, appsRegistry } from '../../lib/appsRegistry'
import HeaderDesktop from '../../components/HeaderDesktop'
import HeaderMobile from '../../components/HeaderMobile'

export default {
  name: 'apps',
  data () {
    return {
      editModeActive: false,
      editModeTmOut: null
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
      this.setNotification(active)
    }
  },
  beforeDestroy () {
    if (!this.editModeActive) return
    this.setNotification(false)
  },
  methods: {
    ...mapMutations(['selectAppToRemove']),
    editMode (action = null) {
      if (!this.loggedIn) return
      if (action === 'cancel') return clearTimeout(this.editModeTmOut)
      this.editModeTmOut = setTimeout(() => { this.editModeActive = true }, 1000)
    },
    setNotification (visible) {
      this.$store.commit('setNotification', visible && ({
        text: 'You\'re now removing æpps',
        action: {
          name: 'Cancel',
          handler: () => {
            this.editModeActive = false
          }
        }
      }))
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
