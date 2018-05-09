import { mapState } from 'vuex'
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
    resolve: {
      type: Function,
      required: true
    },
    reject: {
      type: Function,
      required: true
    }
  },
  computed: mapState({
    address: (state, { activeIdentity }) => activeIdentity.address
  }),
  methods: {
    close () {
      this.reject(new Error('Signing rejected by user'))
      this.$store.commit('setMessageToApprove')
    },
    approve () {
      this.resolve()
      this.$store.commit('setMessageToApprove')
    }
  },
  components: {
    AeIdentityAvatar,
    ApproveButtons,
    DialogHeader
  }
}
