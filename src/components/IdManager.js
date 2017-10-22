import aeIdentity from './aeIdentity/aeIdentity.vue'
import aeButton from './aeButton/aeButton.vue'
import { swiper as Swiper, swiperSlide as SwiperSlide} from 'vue-awesome-swiper'

export default {
  name : 'IdManager',
  data(){
    return {
      notNextTick: true,
      swiperOption: {
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        debugger: true,
        slidesPerView: 2,
        spaceBetween: 10,
        centeredSlides: true
      }
    }
  },
  components : {
    'ae-identity' : aeIdentity,
    'ae-button' : aeButton,
    'swiper': Swiper,
    'swiper-slide': SwiperSlide
  },
  computed : {
    activeIdentity () {
      return this.$store.getters.activeIdentity
    },
    addresses () {
      return this.$store.getters.addresses
    },
    identities () {
      return this.$store.getters.identities
    }
  },
  methods : {
    activateId (id) {
      this.$store.commit('selectIdentity', this.identities.indexOf(id))
    },
    generateFirstAddress() {
      console.log('generateFirstAddress')
      this.$store.dispatch('generateAddress')
    },
    generateNewIdentity() {
      console.log('generateNewIdentity')
      this.$store.dispatch('generateAddress')
    },
    goBack () {
      this.$router.push('/app-browser')
    },
    isActive (id) {
      return id.address === this.activeIdentity.address
    }
  },
  created() {
    if(!this.$store.state.unlocked) {
      this.$router.push({ path: 'unlock' })
    }
    if(this.addresses && this.addresses.length < 1) {
      this.generateFirstAddress()
    }
  }
}
