import { mapGetters } from 'vuex'
import {
  AeIdentity,
  AeButton,
  AeIcon,
  AeLabel,
  AeDivider,
  aeHelperMixin as helperMixin
} from '@aeternity/aepp-components'

export default {
  name: 'id-manager',
  props: {
    title: String
  },
  components: {
    AeIdentity,
    AeButton,
    AeIcon,
    AeLabel,
    AeDivider
  },
  mixins: [helperMixin],
  computed: {
    ...mapGetters(['identities', 'activeIdentity']),
    totalAmount () {
      let amount = 0
      let tokenAmount = 0
      this.identities.forEach(identity => {
        amount += identity
          ? parseFloat(helperMixin.methods.readableEther(identity.balance))
          : 0
        tokenAmount +=
          identity && identity.tokenBalance
            ? parseFloat(
                helperMixin.methods.readableToken(identity.tokenBalance)
              )
            : 0
      })
      return {
        amount,
        tokenAmount
      }
    },
    inactiveIdentities () {
      return this.identities.filter(
        identity => identity.address !== this.activeIdentity.address
      )
    }
  },
  methods: {
    activateId (id) {
      this.$store.commit('selectIdentity', this.identities.indexOf(id))
    },
    generateNewIdentity () {
      this.$store.dispatch('createIdentity')
    },
    goBack () {
      this.$store.commit('toggleIdManager')
    },
    getStyle (index) {
      let top = 60 * index

      if (
        index !== this.activeIdentityCard &&
        index > this.activeIdentityCard
      ) {
        top = 60 * (index + 1)
      }

      const zIndex = index === this.activeIdentityCard ? 120 : 60

      return {
        top: `${top}px`,
        'z-index': `${zIndex}`
      }
    },
    activateCard (index) {
      if (index === this.activeIdentityCard) {
        this.activeIdentityCard = this.inactiveIdentities.length
      } else {
        this.activeIdentityCard = index
      }
    }
  },
  mounted () {
    this.activeIdentityCard = this.inactiveIdentities.length
  }
}
