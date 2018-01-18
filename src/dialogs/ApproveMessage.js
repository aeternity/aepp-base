import ApproveButtons from '@/dialogs/ApproveButtons.vue'
import DialogHeader from '@/dialogs/DialogHeader.vue'

import {
  AeIdentityAvatar
} from '@aeternity/aepp-components'

export default {
  name: 'approve-message',
  props: {
    appName: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    identity: {
      type: Object,
      required: true
    }
  },
  computed: {
    address () {
      return this.identity.address
    }
  },
  methods: {
    reject () {
      this.$close(false)
    },
    approve () {
      this.$close(true)
    }
  },
  components: {
    AeIdentityAvatar,
    ApproveButtons,
    DialogHeader
  }
}
