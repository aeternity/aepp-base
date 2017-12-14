import QuickId from '@/components/QuickId.vue'
import { AeAppIcon } from '@aeternity/aepp-components'
import { PATHS } from '../router'
export default {
  name: 'app-browser',
  data () {
    return {
      iframe: '',
      showIframe : false,
      iframeLoading : true,
    }
  },
  watch: {
    url () {
      this.resolveUrl()
    }
  },
  computed : {
    url () {
      return this.$route.query && this.$route.query.aepp
    },
    apps() {
      return this.$store.state.apps
    },
    iframeStyle() {
      let style
      if(this.iframe === '') {
        style =  {
          'margin-left' : '200%',
          opacity : '0.0',
          transform: 'scale(1.5)'
        }
      } else {
        style =  {
          'margin-left' : '0%',
          opacity : '1.0',
          transform: 'scale(1.0)'
        }
      }
      style.display = this.showIframe ? 'block' : 'none'
      return style
    }
  },
  methods : {
    open(app) {
      if(app.type === 1) {
        this.$router.push(PATHS.EMBEDDED_APP + '/?aepp=' + app.main)
        if(this.iframe !== app.main) {
          this.iframeLoading = true
          this.iframe = app.main
        }
        this.showIframe = true
      } else {
        this.$router.push(app.main)
      }
    },
    back() {
      this.$router.push(PATHS.EMBEDDED_APP)
      this.showIframe = false
    },
    add() {
      let url = prompt('URL');
      if(url) {
        this.$store.dispatch('addApp', url)
      }

    },
    resolveUrl () {
      if (this.url) {
        let app = this.apps.find((app) => {
          return app.main.indexOf(this.url) > -1
        })
        if (app) {
          this.open(app)
        } else {
          this.$store.dispatch('addApp', this.url).then((app) => {
            this.open(app)
          }).catch((err) => console.log(err))
        }
      }
    }
  },
  components: {
     QuickId,
     AeAppIcon
  },
  mounted() {
    this.$refs.appframe.onload = () => {
      this.iframeLoading = false
    }
    this.resolveUrl()
    this.$store.commit('forwardPath', null)
  }
}
