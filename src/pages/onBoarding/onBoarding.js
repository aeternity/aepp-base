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
      console.log('hod' + this.max > 1 && this.showDots)
      return this.max > 1 && this.showDots
    },
    isLastStep () {
      return this.step === this.max
    }
  },
  methods: {
    setCssVars () {
      this.$el.style.setProperty(
        '--x',
        `${(this.step * 100 - 100) * this.x_multiplier}%`
      )
      this.$el.style.setProperty(
        '--y',
        `${(this.step * 100 - 100) * this.y_multiplier}%`
      )
      this.$el.style.setProperty('--axis', this.axis)
      this.$el.style.setProperty('--axis-reverse', this.axisReverse)
      this.$el.style.setProperty('--cross', this.cross)
      this.$el.style.setProperty('--cross-reverse', this.crossReverse)
      // this.$el.style.setProperty('--vision', this.xray)
    },
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
