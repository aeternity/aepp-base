import { AeButton } from '@aeternity/aepp-components'

export default {
  name: 'id-page-onBoarding',
  components: { AeButton },
  data: () => ({
    step: 1,
    max: 1,
    showDots: true
  }),
  mounted () {
    let self = this
    self.$sections = self.$el.querySelectorAll('section')
    self.max = self.$sections.length
    self.goToStep(self.step)
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

      this.setCssVars()
    },
    skip (step) {
      this.step += step
      this.goToStep(this.step)
    }
  }
}
