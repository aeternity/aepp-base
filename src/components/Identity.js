import Avatar from './Avatar.vue'
export default {
	name: 'identity',
	components : {
		'avatar' : Avatar
	},
	data : function() {
		return {
			showPaymentUi : false
		};
	},
	computed : {
		identity : function() {
			return this.$store.state.identity;
		},
		collapsed : function() {
			return (!this.showPaymentUi) && this.$store.state.identityCollapsed;
		},
		paymentRequest : function() {
			return this.$store.state.identity.paymentRequest;
		},
		blockie: function() {
			return false // blockies.create();
		}
	},
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
