import Swiper from 'swiper'
import {AeButton} from '@aeternity/aepp-components'
export default {
  components : {
    AeButton
  },
  //components : [ aeButton
  //],
	mounted() {
		new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			nextButton: '.next'
		})
	}
}
