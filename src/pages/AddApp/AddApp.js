import Fuse from 'fuse.js'
import { mapState, mapActions } from 'vuex'
import {
  AeLabel,
  AeInput,
  AeButton,
  AeIcon,
  AeAppIcon,
  AeDivider
} from '@aeternity/aepp-components'
import { DEFAULT_ICON, appsRegistry } from '@/lib/appsRegistry'
import MobilePage from '@/components/MobilePage'

const allApps = Object.entries(appsRegistry)
  .map(([id, d]) => ({
    icon: DEFAULT_ICON,
    ...d,
    id
  }))

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
    MobilePage
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
          added: apps.some(a => a === app.id)
        }))
    }
  }),
  methods: {
    ...mapActions(['addApp']),
    async addAppByUrl () {
      if (!this.url || this.appAddingByUrl || !await this.$validator.validateAll()) return
      this.appAddingByUrl = true
      await this.addApp(this.url)
      this.$router.push({ name: 'apps' })
      this.appAddingByUrl = false
    }
  }
}
