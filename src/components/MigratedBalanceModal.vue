<template>
  <ae-modal-light
    v-if="showMigratedBalance"
    class="migration-confirm"
  >
    <div class="balance">
      <div class="label">
        {{ migratedBalance }}
      </div>
      are being migrated to this account and will be available as balance soon!
    </div>
    <ae-button
      slot="buttons"
      class="ok"
      size="medium"
      fill="primary"
      uppercase
      @click="showMigratedBalance = false"
    >
      Ok
    </ae-button>
    <ae-button
      slot="buttons"
      :to="'https://token-migration.aepps.com/#/status/result/' + activeIdentity.address"
      class="see"
      size="medium"
      uppercase
      plain
    >
      See migrations
    </ae-button>
  </ae-modal-light>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';
import AeModalLight from './AeModalLight.vue';
import AeButton from './AeButton.vue';
import { MAGNITUDE } from '../lib/constants';

export default {
  components: {
    AeModalLight,
    AeButton,
  },
  data() {
    return {
      showMigratedBalance: true,
      migratedBalance: '',
    };
  },
  computed: mapGetters(['activeIdentity']),
  async mounted() {
    const response = await fetch(process.env.VUE_APP_MIGRATION_STATUS_URL.replace('ADDRESS', this.activeIdentity.address));
    const json = await response.json();
    this.migratedBalance = json
      .filter(i => i.deliveryPeriod > process.env.VUE_APP_MIGRATION_PHASE)
      .reduce((r, item) => r.plus(item.value), BigNumber(0)).shiftedBy(-MAGNITUDE).toFormat();
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.migration-confirm {
  background-image: linear-gradient(
    to bottom, rgba($color-neutral-positive-2, 0.8), rgba($color-neutral-positive-2, 0.8)
  );
  padding: 0 rem(20px);

  /deep/ .ae-modal-light {
    padding: rem(34px);
    padding-bottom: rem(10px);
    border-radius: rem(4px);
    background-color: $color-neutral-positive-3;
    text-align: center;

    .buttons {
      margin-top: rem(30px);
    }
  }

  .balance {
    @extend %face-sans-xs;
    font-weight: normal;
    color: $color-neutral-negative-1;

    .label {
      margin-bottom: rem(8px);
      @extend %face-sans-l;
      font-size: rem(43px);
      font-weight: bold;
      word-break: break-all;
      line-height: rem(40px);
      color: $color-neutral-negative-3;

      &:after {
        margin-left: rem(-8px);
        @extend %face-sans-s;
        content: 'AE';
      }
    }
  }

  .ok {
    width: rem(251px);
  }

  .see {
    font-weight: bold;
    color: $color-neutral-negative-3;
  }
}
</style>
