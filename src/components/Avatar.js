import helperMixin from '../mixins/helper.js'

export default {
		name : 'avatar',
		props : [
			'image',
			'address'
		],
		mixins: [
			helperMixin
		],
		computed: {
			style: function () {
				if (this.address) {
					return {
						backgroundImage: "url('" + this.blockie(this.address) + "')"
					}
				} else {
					return {
						backgroundColor: '#d1d1d1'
					}
				}
			}
		}
	}
