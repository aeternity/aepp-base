<template>
  <AeCard
    fill="dark"
    class="ae-account-reverse"
  >
    <main>
      <AeQrCode :data="activeAccount.address" />
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
import { AeQrCode } from '../async';
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
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.ae-account-reverse {
  main {
    display: flex;
    align-items: center;
    padding: rem(12px);

    .ae-qr-code {
      flex-grow: 1;
      background-color: $color-neutral-maximum;
      margin-right: rem(12px);
    }

    @media (max-width: 320px) {
      .ae-address {
        font-size: rem(15px);
        line-height: rem(20px);
        letter-spacing: normal;
      }
    }
  }

  .balance-title {
    @extend %face-sans-xs;
  }
}
</style>
