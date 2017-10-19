import ZeroClientProvider from 'web3-provider-engine/zero'
export default {
  name : 'app-browser',
  data(){
    return {
      iname: '/static/aexistence/index.html',
    }
  },
  computed : {
    iframe() { return this.iname },
  },
  methods : {
    loadIFrame() {
      this.$refs.appframe.src = this.iframe
    },
  }
}
