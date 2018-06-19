<template>
  <div class="approve">
    <dialog-header
      :app-name="appName"
      title="Requests a transaction"
      icon-src="static/icons/aepps/default.svg"
    />
    <div class="transaction-flow">
      <div
        :title="`from ${transaction.sender}`"
        class="id">
        <ae-identity-avatar :address="transaction.sender" />
        <div>{{ transaction.sender }}</div>
      </div>
      <ae-icon
        name="arrow"
        class="approve__flow-direction" />
      <div
        :title="`to ${transaction.recipientPubkey}`"
        class="id">
        <ae-identity-avatar :address="transaction.recipientPubkey" />
        <div>{{ transaction.recipientPubkey }}</div>
      </div>
    </div>
    <hr>
    <ae-amount
      :value="transaction.amount"
      class="approve__amount"
      color="black"
      size="med"
      unit="Æ"
    />
    <div
      v-if="price"
      class="fiat-value"
    >
      {{ transaction.amount * price | round(10) }} CHF
    </div>
    <hr>
    <div class="additional-fees-table">
      <span class="additional-fees-header"> Additional fees</span>
      <div class="additional-fees-value">
        <div class="additional-fees-eth">{{ transaction.fee }} Æ</div>
        <div
          v-if="price"
          class="fiat-value"
        >
          {{ transaction.fee * price | round(5) }} CHF
        </div>
      </div>
    </div>
    <approve-buttons
      @approve="approve"
      @reject="close" />
  </div>
</template>

<script>
import { AeAmount, AeIcon, AeIdentityAvatar } from '@aeternity/aepp-components'
import { convertAEtoCHF } from '@/lib/currencyConverter'
import ApproveButtons from '@/dialogs/ApproveButtons.vue'
import DialogHeader from '@/dialogs/DialogHeader.vue'

export default {
  name: 'ApproveTransaction',
  components: {
    AeAmount,
    AeIdentityAvatar,
    AeIcon,
    ApproveButtons,
    DialogHeader
  },
  filters: {
    round (value, decimal) {
      const rounded = parseFloat(value.toFixed(decimal))
      const start = rounded === value ? '' : '≈ '
      return `${start}${rounded}`
    }
  },
  props: {
    appName: {
      type: String,
      default: ''
    },
    transaction: Object,
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      price: null
    }
  },
  async mounted () {
    this.price = await convertAEtoCHF()
  },
  methods: {
    close () {
      this.$store.commit('cancelTransaction', this.id)
    },
    approve () {
      this.$store.commit('approveTransaction', this.id)
    }
  }
}
</script>
<style scoped src="./ApproveTransaction.css" />
