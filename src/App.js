import IdManager from '@/components/IdManager.vue'
import store from './store'

export default {
  name: 'app',
  components: {
    'id-manager': IdManager
  },
  computed: {
    showIdManager: () => {
      return store.state.showIdManager && store.state.unlocked
    },
    idManagerClassObject () {
      return {
        'app_id-manager': true,
        '_open': store.state.showIdManager && store.state.unlocked
      }
    }
  },
  created: function () {
  },
  methods: {
  },
  data () {
    return {}
  }
}
