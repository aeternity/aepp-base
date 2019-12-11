<template>
  <Modal class="migrated-balance">
    <div class="balance">
      <div class="label">
        {{ migratedBalance }}
      </div>
      {{ $t('transfer.migrated-balance.note') }}
    </div>

    <div class="buttons">
      <AeButton @click="resolve">
        {{ $t('ok') }}
      </AeButton>
      <AeButton
        :to="'https://token-migration.aepps.com/#/status/result/' + activeAccount.address"
        plain
      >
        {{ $t('transfer.migrated-balance.to-migrations') }}
      </AeButton>
    </div>
  </Modal>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';
import Modal from './Modal.vue';
import AeButton from '../AeButton.vue';
import { MAGNITUDE } from '../../lib/constants';

export default {
  components: {
    Modal,
    AeButton,
  },
  props: {
    resolve: { type: Function, required: true },
  },
  data() {
    return {
      migratedBalance: '',
    };
  },
  computed: mapGetters({ activeAccount: 'accounts/active' }),
  async mounted() {
    const response = await fetch(process.env.VUE_APP_MIGRATION_STATUS_URL.replace('ADDRESS', this.activeAccount.address));
    const json = await response.json();
    this.migratedBalance = json
      .filter(i => i.deliveryPeriod > process.env.VUE_APP_MIGRATION_PHASE)
      .reduce((r, item) => r.plus(item.value), BigNumber(0)).shiftedBy(-MAGNITUDE).toFormat();
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/typography';

.migrated-balance {
  >>> .modal-plain {
    max-width: rem(275px);
    padding: rem(50px) rem(30px) rem(10px) rem(30px);
    background-color: $color-neutral-positive-3;
  }

  .balance {
    @extend %face-sans-s;
    font-weight: normal;
    color: $color-neutral-negative-3;
    text-align: center;

    .label {
      margin-bottom: rem(8px);
      @extend %face-sans-l;
      font-size: rem(43px);
      font-weight: bold;
      word-break: break-all;
      line-height: rem(40px);

      &:after {
        margin-left: rem(-8px);
        @extend %face-sans-s;
        content: 'AE';
      }
    }
  }

  .buttons {
    display: flex;
    flex-direction: column;
    margin-top: rem(20px);

    .ae-button {
      min-width: 0;
    }
  }
}
</style>
