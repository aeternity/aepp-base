import { mapState } from 'vuex'
import { AeAppIcon, AeButton, AeIcon, AeNotification, AeModalLight } from '@aeternity/aepp-components'
import QuickId from '@/components/QuickId/QuickId.vue'

export default {
  name: 'apps',
  data () {
    return {
      editModeActive: false,
      editModeTmOut: null,
      removeAppName: ''
    }
  },
  computed: mapState({
    apps: state => state.apps
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
    add () {
      const url = prompt('URL')
      if (url) {
        this.$store.dispatch('addApp', url)
      }
    },
    remove () {
      this.$store.commit('removeApp', this.removeAppName)
      this.removeAppName = ''
    },
    editMode (action = null) {
      if (action === 'cancel') return clearTimeout(this.editModeTmOut)
      this.editModeTmOut = setTimeout(() => { this.editModeActive = true }, 1000)
    }
  },
  components: {
    QuickId,
    AeAppIcon,
    AeIcon,
    AeButton,
    AeNotification,
    AeModalLight
  }
}
