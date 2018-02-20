import Fuse from 'fuse.js'
import { mapState } from 'vuex'
import {
  AeLabel,
  AeInput,
  AeButton,
  AeIcon,
  AeAppIcon,
  AeDivider,
  AeModal
} from '@aeternity/aepp-components'
import QuickId from '@/components/QuickId/QuickId.vue'
import allApps from '@/lib/appsRegistry'

const fuse = new Fuse(allApps, {
  tokenize: true,
  matchAllTokens: true,
  keys: ['name']
})

export default {
  components: {
    AeLabel,
    AeInput,
    AeButton,
    AeAppIcon,
    AeIcon,
    AeDivider,
    AeModal,
    QuickId
  },
  data: () => ({
    url: '',
    appAddingByUrl: false,
    searchTerm: ''
  }),
  computed: mapState({
    apps ({ apps }) {
      return (this.searchTerm ? fuse.search(this.searchTerm) : allApps)
        .map(app => ({
          ...app,
          added: apps.some(a => a.path === app.path)
        }))
    }
  }),
  methods: {
    addApp (app) {
      this.$store.dispatch('addApp', app)
    },
    async addAppByUrl () {
      if (!this.url || this.appAddingByUrl || !await this.$validator.validateAll()) return
      this.appAddingByUrl = true
      await this.$store.dispatch('addApp', this.url)
      this.$router.push({ name: 'apps' })
      this.appAddingByUrl = false
    },
    goToApps () {
      this.$router.push({ name: 'apps' })
    }
  }
}
