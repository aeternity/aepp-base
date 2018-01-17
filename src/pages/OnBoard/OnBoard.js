import AeIdentity from '@/components/aeIdentityNew/aeIdentity.vue'
import { AeButton } from '@aeternity/aepp-components'

const BN = require('bn.js')

let identity = {
  cardName: 'Your first ID',
  address: '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9',
  balance: new BN('1337000000000000000', 10)
}

export default {
  data: () => ({
    identity,
    step: 1,
    max: 1,
    showDots: true
  }),
  components: {
    AeIdentity,
    AeButton
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
  },
  mounted () {
    let self = this
    self.$sections = self.$el.querySelectorAll('section')
    self.max = self.$sections.length
    self.goToStep(self.step)
  }
}
