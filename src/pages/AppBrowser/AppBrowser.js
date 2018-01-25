import QuickId from '@/components/QuickId/QuickId.vue'
import { AeAppIcon, AeButton, AeIcon, AeNotification, AeModalLight } from '@aeternity/aepp-components'

export default {
  name: 'app-browser',
  data () {
    return {
      iframe: '',
      showIframe: false,
      iframeLoading: true,
      isTouch: false,
      editModeActive: false,
      editModeTmOut: null,
      notifications: [],
      modal: null
    }
  },
  computed: {
    apps () {
      return this.$store.state.apps
    },
    iframeStyle () {
      let style
      if (this.iframe === '') {
        style = {
          'margin-left': '200%',
          'opacity': '0.0',
          'transform': 'scale(1.5)'
        }
      } else {
        style = {
          'margin-left': '0%',
          'opacity': '1.0',
          'transform': 'scale(1.0)'
        }
      }
      style.display = this.showIframe ? 'block' : 'none'
      return style
    }
  },
  watch: {
    editModeActive (active) {
      if (active) {
        this.notifications.push({type: 'boring', message: "You're now removing æpps"})
        setTimeout(() => this.notifications.shift(), 3000)
      }
    }
  },
  methods: {
    open (app) {
      if (app.type === 1) {
        if (this.iframe !== app.main) {
          this.iframeLoading = true
          this.iframe = app.main
        }
        this.showIframe = true
      } else {
        this.$router.push(app.main)
      }
    },
    back () {
      this.showIframe = false
    },
    add () {
      let url = prompt('URL')
      if (url) {
        this.$store.dispatch('addApp', url)
      }
    },
    remove (name) {
      this.modal = null
      if (name) {
        this.$store.dispatch('removeApp', name)
      }
    },
    confirmRemove (name) {
      this.modal = {
        title: `Delete "${name}"?`,
        message: 'You can easily add this æpp again, if you are regretting this action',
        target: name
      }
    },
    closeModal () {
      this.modal = null
    },
    editMode (action = null) {
      if (action === 'cancel') return clearTimeout(this.editModeTmOut)
      this.editModeTmOut = setTimeout(() => { this.editModeActive = true }, 1000)
    },
    setIsTouch () {
      this.isTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch
    },
    doNothing () {
      // to stop .app-browser @click handler propogation
    }
  },
  components: {
    QuickId,
    AeAppIcon,
    AeIcon,
    AeButton,
    AeNotification,
    AeModalLight
  },
  created () {
    this.setIsTouch()
  },
  mounted () {
    console.log(this.$refs)
    this.$refs.appframe.onload = () => {
      this.iframeLoading = false
    }
  }
}
