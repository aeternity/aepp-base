import aeIdentityAvatar from './../aeIdentityAvatar/aeIdentityAvatar.vue'
import aeIdentityInfo from './../aeIdentityInfo/aeIdentityInfo.vue'
export default {
	name: 'ae-identity',
	components : {
    'ae-identity-avatar' : aeIdentityAvatar,
    'ae-identity-info' : aeIdentityInfo
	},
	data : function() {
		return {
			showPaymentUi : false
		};
	},
  props : [
    'identity'
  ],
	//computed : {
	//},
	watch : {
		paymentRequest : function(req) {
			console.log(req);
			if(req) {
				this.showPaymentUi = true;
			} else {
				this.showPaymentUi = false;
			}
		}
	},
	methods: {
		toggle : function() {
			if(this.$store.state.appClass !== 'home') {
				this.$store.commit('identityCollapsed', !this.$store.state.identityCollapsed);
			}
		},
		pay : function() {
			store.dispatch('approvePayment');
			setTimeout(()=>{
				this.showPaymentUi = false;
			}, 200);
		},
		cancel : function() {
			store.dispatch('cancelPayment');
			this.showPaymentUi = false;
		}
	}
};
