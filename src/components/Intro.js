import Swiper from 'swiper'
import aeButton from './aeButton/aeButton.vue'
export default {
  components : {
    'ae-button' : aeButton
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
