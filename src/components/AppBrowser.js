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
      window.web3 = this.$store.getters.web3
      this.$refs.appframe.src = this.iframe
    },
  }
}
