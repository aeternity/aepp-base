<template>
  <AeCard
    fill="dark"
    class="ae-account-reverse"
  >
    <main>
      <AeQrCode
        :size="136"
        :data="activeAccount.address"
      />
      <AeAddress
        :address="activeAccount.address"
        split-by="3"
      />
    </main>

    <span
      slot="toolbar"
      class="balance-title"
    >
      {{ activeAccount.name }}
    </span>
  </AeCard>
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
  computed: mapGetters({ activeAccount: 'accounts/active' }),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.ae-account-reverse {
  main {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-top: rem(12px);
    padding-bottom: rem(12px);

    .ae-qr-code {
      background-color: $color-neutral-maximum;
    }
  }

  .balance-title {
    @extend %face-sans-xs;
  }
}
</style>
