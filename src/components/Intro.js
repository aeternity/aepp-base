import Swiper from 'swiper'
export default {
	mounted() {
		new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			nextButton: '.next'
		})
	}
}
