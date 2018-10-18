<template>
  <ae-card
    :fill="fill"
    class="ae-account">
    <header>
      <ae-identicon :address="address" />
      <ae-input-plain
        value="Main Account"
        placeholder="Account name"
        fill="white"
      />
      <div class="slot-icon">
        <slot name="icon" />
      </div>
    </header>

    <main>
      <div class="security-status">{{ securityStatus }}</div>
      <ae-address
        :value="address"
        length="medium"
        gap="0"
      />
    </main>

    <template slot="toolbar">
      <span class="balance-title">Balance</span>
      <span class="balance-value">{{ balance }}</span>
    </template>
  </ae-card>
</template>

<script>
import { AeAddress, AeIdenticon, AeInputPlain } from '@aeternity/aepp-components-3';
import AeCard from './AeCard.vue';

export default {
  name: 'AeAccount',
  components: {
    AeAddress,
    AeIdenticon,
    AeCard,
    AeInputPlain,
  },
  props: {
    address: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    securityStatus: {
      type: String,
      default: 'normal\nsecured',
    },
    fill: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions';

.ae-account.ae-card {
  header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: rem(12px) rem(16px) 0 rem(12px);
    margin-bottom: rem(12px);

    .slot-icon {
      margin-left: auto;
    }

    .ae-identicon {
      margin-right: rem(8px);
    }
  }

  main {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: rem(16px) rem(8px) rem(8px) rem(16px);

    .security-status {
      @extend %face-uppercase-xs;
      white-space: pre-line;
      margin-bottom: 0.25rem;
      font-weight: bold;
    }

    .ae-address {
      margin-left: auto;
      width: rem(150px);
    }
  }

  .balance-title, .balance-value {
    text-transform: none;
  }

  .balance-title {
    @extend %face-sans-xs;
  }

  .balance-value {
    @extend %face-mono-base;
    font-weight: normal;

    &:after {
      @extend %face-mono-xs;
      margin-left: 5px;
      content: 'AE';
    }
  }
}
</style>
