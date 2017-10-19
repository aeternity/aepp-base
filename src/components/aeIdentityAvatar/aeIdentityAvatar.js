const blockies = require('ethereum-blockies-png')

export default {
		name : 'avatar',
		props : [
			'address'
		],
    methods : {
      blockie(address) {
        return blockies.createDataURL({
          seed: address
        })
      }
    },
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
