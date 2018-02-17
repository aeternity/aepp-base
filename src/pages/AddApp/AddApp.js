import Fuse from 'fuse.js'
import { mapState } from 'vuex'
import {
  AeHeader,
  AeLabel,
  AeInput,
  AeButton,
  AeIcon,
  AeAppIcon,
  AeDivider
} from '@aeternity/aepp-components'
import QuickId from '@/components/QuickId/QuickId.vue'

export default {
  name: 'AddApp',
  components: {
    AeHeader,
    AeLabel,
    AeInput,
    AeButton,
    AeAppIcon,
    AeIcon,
    AeDivider,
    QuickId
  },
  data () {
    return {
      appName: ''
    }
  },
  computed: mapState({
    apps () {
      const searchTerm = this.appName
      const apps = this.$store.state.apps

      var options = {
        tokenize: true,
        matchAllTokens: true,
        keys: ['name']
      }

      const fuse = new Fuse(apps, options)

      return searchTerm === '' ? apps : fuse.search(searchTerm)
    },
    addNewApp () {
      return this.apps.length <= 0 && this.appName !== ''
    }
  }),
  methods: {
    formOnChange (event) {
      if (event.target.id === 'app-name') {
        this.appName = event.target.value
      }
    },
    addApp () {
      const url = this.appName
      if (url !== '' && this.addNewApp) {
        this.$store.dispatch('addApp', url)
      }
      this.appName = ''
    }
  }
}
