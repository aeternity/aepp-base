<template>
  <ae-modal-light class="migration-confirm">
    <div class="migration">
      <div class="label">
        {{ +migratedBalance }}
      </div>
      are being migrated to this account and will be available as balance soon!
    </div>
    <ae-button
      slot="buttons"
      class="migration-see"
      size="medium"
      fill="primary"
      uppercase
      @click="$emit('click')"
    >
      Ok
    </ae-button>
    <ae-button
      slot="buttons"
      :to="'https://token-migration.aepps.com/#/status/result/' + activeIdentity.address"
      class="migration-ok"
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
import AeModalLight from '../components/AeModalLight.vue';
import AeButton from '../components/AeButton.vue';

export default {
  components: {
    AeModalLight,
    AeButton,
  },
  data: () => ({
    migratedBalance: '',
  }),
  computed: {
    ...mapGetters(['activeIdentity']),
  },
  async mounted() {
    const response = await fetch(`https://api.backendless.com/${process.env.VUE_APP_BL_ID}/
${process.env.VUE_APP_BL_KEY}/data/${process.env.VUE_APP_BL_TABLE}
?pageSize=100&where=pubKey%20%3D%20%27${this.activeIdentity.address}%27`);
    const json = await response.json();
    const balance = json
      .filter(i => i.deliveryPeriod > +process.env.VUE_APP_BL_PERIOD)
      .reduce((r, item) => r.plus(item.value), BigNumber(0)).shiftedBy(-18);
    this.migratedBalance = balance.toString();
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
  padding: rem(20px);

  /deep/ .ae-modal-light {
    padding: rem(34px);
    padding-bottom: rem(10px);
    border-radius: rem(4px);
    background-color: $color-neutral-positive-3;

    text-align: center;

    .migration {
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

    .buttons {
      margin-top: rem(30px);

      .migration-see {
        width: rem(251px);
      }

      .migration-ok {
        font-weight: bold;
        color: $color-neutral-negative-3;
      }
    }
  }
}
</style>
