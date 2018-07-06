import { AeButton, AeAppIcon } from '@aeternity/aepp-components'
import HeaderDesktop from '../../components/HeaderDesktop'

export default {
  name: 'onboarding',
  components: { AeButton, HeaderDesktop, AeAppIcon },
  data: () => ({
    step: 1,
    max: 1,
    showDots: true
  }),
  mounted () {
    this.$sections = this.$el.querySelectorAll('section')
    this.max = this.$sections.length
    this.goToStep(this.step)
  },
  computed: {
    hasDots () {
      return this.max > 1 && this.showDots
    },
    isLastStep () {
      return this.step === this.max
    }
  },
  methods: {
    goToStep (step) {
      this.step = step > this.max ? this.max : step < 1 ? 1 : step
      this.currentSection = this.$sections[this.step - 1]

      this.$sections.forEach(section => {
        section.classList.remove('current')
      })
      this.currentSection.classList.add('current')
      this.currentSection.scrollTop = 0
    },
    skip (step) {
      this.step += step
      this.goToStep(this.step)
    }
  }
}
