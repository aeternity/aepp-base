import MenuEntry from './MenuEntry.vue'
import QuickId from './QuickId.vue'
import aeIdentityAvatar from './aeIdentityAvatar/aeIdentityAvatar.vue'

export default {
  name: 'topbar',
  components: {
    'ae-identity-avatar': aeIdentityAvatar,
    'menu-entry': MenuEntry,
    'quick-id': QuickId
  },
  data: function () {
    return {
      navopen: false,
      showAdd: true,
      showBurger: true,
      showBack: false,
      entries: [
        {
          label: 'Manage Identities',
          link: '/id-manager'
        },
        {
          label: 'Browse aepps',
          link: '/app-browser'
        }
        // {
        // label : 'Shared with me',
        // link : '/new',
        // },
        // {
        // label : 'My Proofs',
        // },
      ]
    }
  },
  computed: {
    thisclass: function () {
      return {
        'topbar': true,
        'open': this.navopen
      }
    },
    identity: function () {
      return this.$store.getters.activeIdentity
    },
    title: function () {
      return this.$store.state.title
    }
  },
  watch: {
    '$route': function (to, from) {
      var proofDetail = to.path.match(/^\/proofs\/\d+/) !== null

      this.showAdd = to.path !== '/chat'
      this.showBurger = !proofDetail
      this.showBack = proofDetail
      this.navopen = false
    }
  },
  methods: {
    toggleopen: function () {
      this.navopen = !this.navopen
    }
  }
}
