import { mapGetters } from 'vuex'
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'
import {AeIdentity, AeButton, AeIcon} from '@aeternity/aepp-components'

const commonSwiperOptions = {
  grabCursor: true,
  setWrapperSize: false,
  autoHeight: false,
  paginationClickable: true,
  mousewheelControl: true,
  observeParents: true,
  debugger: true
}

export default {
  name: 'id-manager',
  data () {
    return {
      notNextTick: true,
      swiperOptions: {
        '_direction_vertical': {
          ...commonSwiperOptions,
          direction: 'vertical',
          spaceBetween: 0,
          centeredSlides: false,
          roundLengths: true,
          pagination: '.swiper-pagination._direction_vertical',
          slidesPerView: 1.08,
          breakpoints: {
            '360': {
              slidesPerView: 1.2
            }
          }
        },
        '_direction_horizontal': {
          ...commonSwiperOptions,
          direction: 'horizontal',
          spaceBetween: 0,
          centeredSlides: true,
          slidesPerView: 2,
          roundLengths: true,
          pagination: '.swiper-pagination._direction_horizontal'
        }
      }
    }
  },
  props: {
    title: String
  },
  components: {
    AeIdentity,
    AeButton,
    AeIcon,
    Swiper,
    SwiperSlide
  },
  computed: mapGetters(['identities', 'activeIdentity']),
  methods: {
    activateId (id) {
      this.$store.commit('selectIdentity', this.identities.indexOf(id))
    },
    generateNewIdentity () {
      this.$store.dispatch('generateAddress')
    },
    goBack () {
      // this.$router.push('/app-browser')
      this.$store.dispatch('setShowIdManager', false)
    },
    isActive (id) {
      return id.address === this.activeIdentity.address
    },
    swipeTo (index) {
      if (index >= 0 && index < this.identities.length && this.$refs.mySwiper) {
        if (Array.isArray(this.$refs.mySwiper)) {
          this.$refs.mySwiper.forEach(swiperElem => {
            swiperElem.swiper.slideTo(index)
          })
        } else {
          this.$refs.mySwiper.swiper.slideTo(index)
        }
      }
    },
    logout () {
      this.$store.dispatch('logout')
    }
  },
  mounted () {
    this.swipeTo(this.$store.state.selectedIdentityIdx)
  }
}
