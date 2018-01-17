import Swiper from 'swiper'
import AeButton from '@/components/aeButton/aeButton.vue'

export default {
  components: {
    AeButton
  },
  mounted () {
    new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      nextButton: '.next'
    })
  }
}
