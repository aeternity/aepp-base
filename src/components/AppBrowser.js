import QuickId from '@/components/QuickId.vue'
import { AeAppIcon } from '@aeternity/aepp-components'
import { PATHS } from '../router'
export default {
  name: 'app-browser',
  data () {
    return {
      iframe: '',
      showIframe: false,
      iframeLoading: true,
      linkSchemes: [
        initialQuery => {
          if (initialQuery.aepp && initialQuery.aepp === 'transfer') {
            this.$router.push({path: '/transfer', query: initialQuery})
          }
        },
        initialQuery => {
          if (initialQuery.aepp) {
            // append query to current route
            this.$router.push({query: initialQuery})
            return true
          }
          return false
        }
      ]
    }
  },
  watch: {
    url (newUrl, oldUrl) {
      this.resolveUrl(newUrl)
    },
    iframe (newIframe, oldIframe) {
      // replace the location so it will not be added to the histoty stack of the iframe
      this.$refs.appframe.contentWindow.location.replace(this.iframe)
    }
  },
  computed: {
    url () {
      return this.$route.query && this.$route.query.aepp
    },
    apps () {
      return this.$store.state.apps
    },
    iframeStyle () {
      let style
      if (this.iframe === '') {
        style = {
          'margin-left': '200%',
          opacity: '0.0',
          transform: 'scale(1.5)'
        }
      } else {
        style = {
          'margin-left': '0%',
          opacity: '1.0',
          transform: 'scale(1.0)'
        }
      }
      style.display = this.showIframe ? 'block' : 'none'
      return style
    }
  },
  methods: {
    open (app) {
      if (app.type === 1) {
        this.$router.push(PATHS.EMBEDDED_APP + '/?aepp=' + app.main)
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
      this.$router.push(PATHS.EMBEDDED_APP)
      this.iframe = ''
      this.showIframe = false
    },
    add () {
      let url = prompt('URL')
      if (url) {
        this.$store.dispatch('addApp', url)
      }
    },
    resolveUrl (url) {
      if (url) {
        let app = this.apps.find((app) => {
          return app.main.indexOf(url) > -1
        })
        if (app) {
          this.open(app)
        } else {
          this.$store.dispatch('addApp', url).then((app) => {
            this.open(app)
          }).catch((err) => console.log(err))
        }
      } else {
        this.showIframe = false
      }
    },
    checkInitialQuery () {
      let initialQuery = this.$store.state.initialQuery
      console.log('initialQuery', initialQuery)
      this.linkSchemes.forEach(scheme => {
        if (typeof scheme === 'function') {
          if (scheme(initialQuery)) {
            console.log('found matching scheme')
          }
          // TODO: how to break
        }
      })
      this.$store.commit('initialQuery', null)
    }
  },
  components: {
    QuickId,
    AeAppIcon
  },
  mounted () {
    this.$refs.appframe.onload = () => {
      this.iframeLoading = false
    }
    this.resolveUrl(this.url)
    this.checkInitialQuery()
  }
}
