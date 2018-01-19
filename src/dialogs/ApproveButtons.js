import {
  AeButton,
  AeIcon
} from '@aeternity/aepp-components'

export default {
  name: 'approve-buttons',
  props: {
    rejectLabel: {
      type: String,
      default: 'Cancel'
    },
    approveLabel: {
      type: String,
      default: 'Approve'
    }
  },
  methods: {
    approve () {
      this.$emit('approve')
    },
    reject () {
      this.$emit('reject')
    }
  },
  components: {
    AeButton,
    AeIcon
  }
}
