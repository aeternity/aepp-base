import Identity from './Identity.vue'
import MenuEntry from './MenuEntry.vue'
import Avatar from './Avatar.vue'

export default {
	name: 'topbar',
	components : {
		'avatar': Avatar,
		'menu-entry': MenuEntry,
		'identity' : Identity
	},
	data : function() {
		return {
			navopen : false,
			showAdd : true,
			showBurger : true,
			showBack : false,
			entris : [
				{
					label : 'My Proofs',
					link : '/proofs',
				},
				{
					label : 'Create a Proof',
					link : '/chat',
				},
				//{
				//label : 'Shared with me',
				//link : '/new',
				//},
				//{
				//label : 'My Proofs',
				//},
			]
		}
	},
	computed : {
		thisclass : function() {
			return {
				'topbar' : true,
				'open' : this.navopen,
			};
		},
		identity : function() {
			return this.$store.state.identity;
		},
		title : function() {
			return this.$store.state.title;
		}
	},
	watch: {
		'$route' : function(to, from) {
			var proofDetail = null !== to.path.match(/^\/proofs\/\d+/);

			this.showAdd = to.path !== '/chat';
			this.showBurger = !proofDetail;
			this.showBack = proofDetail;
			this.navopen = false;
		}
	},
	methods : {
		toggleopen : function() {
			this.navopen = !this.navopen;
		}
	},
}
