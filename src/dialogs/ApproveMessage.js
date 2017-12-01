import ApproveButtons from '@/dialogs/ApproveButtons.vue'
import DialogHeader from '@/dialogs/DialogHeader.vue'

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
    }
  },
  methods: {
    reject () {
      this.$close(false)
    },
    approve () {
      this.$close(true)
    }
  }
}
