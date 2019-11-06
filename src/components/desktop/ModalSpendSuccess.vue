<template>
  <Modal
    class="modal-spend-success"
    closable
    :title="$t('transfer.send.resolved.title')"
    @close="resolve"
  >
    <ModalHeader>
      {{ $t('transfer.send.resolved.note') }}
    </ModalHeader>
    <div class="note">
      {{ $t('transfer.send.resolved.subtitle', { amount: convertedAmount }) }}
    </div>

    <template slot="footer">
      <AeButton :to="`${currentNetwork.explorerUrl}/transactions/${transactionHash}`">
        {{ $t('transfer.send.resolved.to-explorer') }}
      </AeButton>
      <AeButton
        v-copy-on-click="transactionHash"
        fill="dark"
        plain
      >
        {{ $t('transfer.send.resolved.copy') }}
      </AeButton>
    </template>
  </Modal>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';
import Modal from './Modal.vue';
import ModalHeader from './ModalHeader.vue';
import AeButton from '../AeButton.vue';
import prefixedAmount from '../../filters/prefixedAmount';
import copyOnClick from '../../directives/copyOnClick';

export default {
  components: {
    Modal, ModalHeader, AeButton,
  },
  directives: { copyOnClick },
  props: {
    amount: { type: BigNumber, required: true },
    transactionHash: { type: String, required: true },
    resolve: { type: Function, required: true },
  },
  computed: mapGetters(['currentNetwork']),
  subscriptions() {
    return { convertedAmount: this.$store.state.observables.convertAmount(() => this.amount) };
  },
  methods: { prefixedAmount },
};
</script>

<style lang="scss" scoped>
@import '../../styles/typography';
@import '../copied';

.modal-spend-success {
  text-align: center;

  .modal-header {
    margin-top: rem(20px);
  }

  .note {
    @extend %face-sans-base;
  }

  .ae-button {
    display: block;
    max-width: rem(310px);
    margin-left: auto;
    margin-right: auto;

    &.v-copied {
      @extend %copied;
    }
  }
}
</style>
