<template>
  <div class="approve">
    <dialog-header
      title="Requests a transaction"
      :appName="appName"
      iconSrc="static/icons/aepps/default.svg"
    />
    <div class="transaction-flow">
      <div class="id" :title="`from ${transaction.sender}`">
        <ae-identity-avatar :address="transaction.sender" />
        <div>{{transaction.sender}}</div>
      </div>
      <ae-icon name="arrow" class="approve__flow-direction" />
      <div class="id" :title="`to ${transaction.recipientPubkey}`">
        <ae-identity-avatar :address="transaction.recipientPubkey" />
        <div>{{transaction.recipientPubkey}}</div>
      </div>
    </div>
    <hr>
    <ae-amount
      class="approve__amount"
      color="black"
      size="med"
      :value="transaction.amount"
      unit="Æ"
    />
    <div
      v-if="price"
      class="fiat-value"
    >
      {{transaction.amount * price | round(10)}} CHF
    </div>
    <hr>
    <div class="additional-fees-table">
      <span class="additional-fees-header"> Additional fees</span>
      <div class="additional-fees-value">
        <div class="additional-fees-eth">{{transaction.fee}} Æ</div>
        <div
          v-if="price"
          class="fiat-value"
        >
          {{transaction.fee * price | round(5)}} CHF
        </div>
      </div>
    </div>
    <approve-buttons @approve="approve" @reject="close" />
  </div>
</template>

<script>
import { AeAmount, AeIcon, AeIdentityAvatar } from '@aeternity/aepp-components'
import { convertAEtoCHF } from '../lib/currencyConverter'
import ApproveButtons from './ApproveButtons.vue'
import DialogHeader from './DialogHeader.vue'

export default {
  name: 'approve-transaction',
  data () {
    return {
      price: null
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
  components: {
    AeAmount,
    AeIdentityAvatar,
    AeIcon,
    ApproveButtons,
    DialogHeader
  },
  methods: {
    close () {
      this.$store.commit('cancelTransaction', this.id)
    },
    approve () {
      this.$store.commit('approveTransaction', this.id)
    }
  },
  filters: {
    round (value, decimal) {
      const rounded = parseFloat(value.toFixed(decimal))
      const start = rounded === value ? '' : '≈ '
      return `${start}${rounded}`
    }
  },
  async mounted () {
    this.price = await convertAEtoCHF()
  }
}
</script>
<style scoped src="./ApproveTransaction.css" />
