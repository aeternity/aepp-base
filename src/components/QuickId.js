import aeIdentity from './aeIdentity/aeIdentity.vue'
export default {
  name : 'quick-id',
  components : {
    'ae-identity' : aeIdentity,
  },
  computed : {
    identity() {
      return this.$store.state.identity;
    },
    collapsed() {
      return (!this.showPaymentUi) && this.$store.state.identityCollapsed;
    },
    //paymentRequest : function() {
    //return this.$store.state.identity.paymentRequest;
    //},
  }
}
