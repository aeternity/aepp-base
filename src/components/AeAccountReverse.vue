<template>
  <ae-card
    :fill="fill"
    class="ae-account-reverse"
  >
    <main>
      <ae-qr-code
        :size="136"
        :data="activeIdentity.address"
      />
      <ae-address
        :value="activeIdentity.address"
        gap="0"
      />
    </main>

    <template slot="toolbar">
      <span class="balance-title">
        {{ activeIdentity.name }}
      </span>
    </template>
  </ae-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { AeAddress } from '@aeternity/aepp-components-3';
import AeCard from './AeCard.vue';
import AeQrCode from './AeQrCode.vue';

export default {
  components: {
    AeCard,
    AeQrCode,
    AeAddress,
  },
  props: {
    fill: {
      type: String,
      required: true,
    },
  },
  computed: mapGetters(['activeIdentity']),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.ae-account-reverse {
  main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: rem(8px);

    .ae-address {
      width: rem(150px);
    }

    .ae-qr-code {
      margin-left: rem(8px);
      background-color: $color-neutral-maximum;
    }
  }

  .balance-title {
    @extend %face-sans-xs;
  }
}
</style>
