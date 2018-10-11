<template>
  <div class="approve-transaction">
    <dialog-header
      :app-name="appName"
      title="Requests a transaction"
    />
    <div class="flow">
      <div
        :title="`from ${transaction.senderId}`"
        class="id">
        <ae-identity-avatar :address="transaction.senderId" />
        {{ transaction.senderId }}
      </div>
      <ae-icon name="arrow" />
      <div
        :title="`to ${transaction.recipientId}`"
        class="id">
        <ae-identity-avatar :address="transaction.recipientId" />
        {{ transaction.recipientId }}
      </div>
    </div>

    <hr>
    <ae-amount
      :value="transaction.amount"
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

    <div class="additional-fees">
      <span class="header">Additional fees</span>
      <div class="value">
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
import { AeAmount, AeIcon, AeIdentityAvatar } from '@aeternity/aepp-components';
import { convertAEtoCHF } from '../lib/currencyConverter';
import ApproveButtons from './ApproveButtons.vue';
import DialogHeader from './DialogHeader.vue';

export default {
  components: {
    AeAmount,
    AeIdentityAvatar,
    AeIcon,
    ApproveButtons,
    DialogHeader,
  },
  filters: {
    round(value, decimal) {
      const rounded = parseFloat(value.toFixed(decimal));
      const start = rounded === value ? '' : '≈ ';
      return `${start}${rounded}`;
    },
  },
  props: {
    appName: {
      type: String,
      default: '',
    },
    transaction: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      price: null,
    };
  },
  async mounted() {
    this.price = await convertAEtoCHF();
  },
  methods: {
    close() {
      this.$store.commit('cancelTransaction', this.id);
    },
    approve() {
      this.$store.commit('approveTransaction', this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.approve-transaction {
  background-image: linear-gradient(to bottom, white, #f1f4f7);
  padding: 30px 20px;
  border: solid 1px transparent;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  width: 300px;
  overflow-y: auto;
  max-height: calc(100% - 10px);

  .flow {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    margin-bottom: 30px;

    .id {
      max-width: 80px;
      text-overflow: ellipsis;
      overflow: hidden;
      font-family: 'Roboto Mono', monospace;

      .ae-identity-avatar {
        margin-bottom: 12px;
      }
    }

    .ae-icon {
      margin-top: 15px;
    }
  }

  hr {
    background-color: $silver;
    height: 2px;
    border: none;
    margin: 15px 0;
  }

  .ae-amount {
    justify-content: center;

    /deep/ .value {
      width: auto;
    }
  }

  .additional-fees {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    .header {
      margin-right: 10px;
      font-weight: bold;
    }

    .value {
      text-align: right;

      .additional-fees-eth{
        font-weight: bold;
      }
    }
  }
}
</style>
