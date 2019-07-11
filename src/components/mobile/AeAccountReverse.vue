<template>
  <AeCard
    fill="dark"
    class="ae-account-reverse"
  >
    <main>
      <AeQrCode :data="address" />
      <AeAddress
        :address="address"
        mode="three-columns"
      />
    </main>

    <span
      v-if="name"
      slot="toolbar"
      class="name"
    >
      {{ name }}
    </span>
  </AeCard>
</template>

<script>
import { mapState } from 'vuex';
import AeCard from '../AeCard.vue';
import { AeQrCode } from '../async';
import AeAddress from '../AeAddress.vue';

export default {
  components: {
    AeCard,
    AeQrCode,
    AeAddress,
  },
  props: {
    address: { type: String, required: true },
    source: { type: Object, required: true },
    hideName: Boolean,
  },
  computed: mapState('accounts', {
    name(state, { getName }) { return this.hideName ? '' : getName(this); },
  }),
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

  .name {
    @extend %face-sans-xs;
  }
}
</style>
