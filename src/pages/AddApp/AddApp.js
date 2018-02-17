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
    apps() {
      const searchTerm = this.appName
      const apps = this.$store.state.apps

      var options = {
        keys: [
          { name: 'name', weight: 0.3 }, 
          { name: 'path', weight: 0.7 }
        ]
      };

      const fuse = new Fuse(apps, options)

      return searchTerm === '' ? apps : fuse.search(searchTerm)
    }
  }),
  methods: {
    formOnChange (event) {
      if (event.target.id === 'app-name') {
        this.appName = event.target.value
      }
    }
  }
}
