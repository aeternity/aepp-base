import {AeAppIcon} from '@aeternity/aepp-components'

export default {
  name: 'dialog-header',
  components: {
    AeAppIcon
  },
  props: {
    appName: {
      type: String,
      default: 'Identity Manager'
    },
    iconSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  }
}
