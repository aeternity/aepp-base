import QuickId from '@/components/QuickId.vue'

export default {
  name: 'app-browser',
  data () {
    return {
      iframe: '',
      showIframe : false,
      iframeLoading : true,
    }
  },
  computed : {
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
      this.showIframe = false
    },
    add() {
      let url = prompt('URL');
      if(url) {
        this.$store.dispatch('addApp', url)
      }

    },
  },
  components: {
    'quick-id': QuickId
  },
  mounted() {
    console.log(this.$refs)
    this.$refs.appframe.onload = () => {
      this.iframeLoading = false
    }
  }
}
