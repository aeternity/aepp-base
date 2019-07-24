<template>
  <AeModal class="modal-spend-success">
    <header>
      <ButtonPlain @click="resolve">
        <Close />
      </ButtonPlain>
    </header>
    <Guide size="big">
      {{ $t('transfer.send.resolved.note') }}
    </Guide>
    <div class="note">
      {{ $t('transfer.send.resolved.subtitle', { amount: prefixedAmount(amount) }) }}
    </div>

    <footer>
      <AeButton :to="`${currentNetwork.explorerUrl}/#/tx/${transactionHash}`">
        {{ $t('transfer.send.resolved.to-explorer') }}
      </AeButton>
      <AeButton
        v-copy-on-click="transactionHash"
        fill="dark"
        plain
      >
        {{ $t('transfer.send.resolved.copy') }}
      </AeButton>
    </footer>
  </AeModal>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';
import AeModal from '../AeModal.vue';
import ButtonPlain from '../ButtonPlain.vue';
import { Close } from '../icons';
import Guide from '../Guide.vue';
import AeButton from '../AeButton.vue';
import prefixedAmount from '../../filters/prefixedAmount';
import copyOnClick from '../../directives/copyOnClick';

export default {
  components: {
    AeModal, ButtonPlain, Close, Guide, AeButton,
  },
  directives: { copyOnClick },
  props: {
    amount: { type: BigNumber, required: true },
    transactionHash: { type: String, required: true },
    resolve: { type: Function, required: true },
  },
  computed: mapGetters(['currentNetwork']),
  methods: { prefixedAmount },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.modal-spend-success {
  text-align: center;

  /deep/ .modal-plain {
    position: relative;
    padding: rem(50px) rem(70px) rem(10px);
  }

  header .button-plain {
    position: absolute;
    top: rem(10px);
    right: rem(10px);
  }

  .note {
    @extend %face-sans-base;
  }

  footer {
    margin-top: rem(50px);

    .ae-button {
      display: block;
      max-width: rem(310px);
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
