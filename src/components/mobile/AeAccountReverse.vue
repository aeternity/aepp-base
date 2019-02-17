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
        :address="activeIdentity.address"
        split-by="3"
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
import AeCard from '../AeCard.vue';
import AeQrCode from '../AeQrCode.vue';
import AeAddress from '../AeAddress.vue';

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
    padding: rem(12px);

    .ae-qr-code {
      background-color: $color-neutral-maximum;
    }
  }

  .balance-title {
    @extend %face-sans-xs;
  }
}
</style>
