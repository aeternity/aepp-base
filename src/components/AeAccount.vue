<template>
  <ae-card
    :fill="fill"
    class="ae-account">
    <header>
      <ae-identicon :address="address" />
      <ae-input-plain
        v-focus="nameEditable"
        v-if="nameEditable"
        :value="name"
        placeholder="Account name"
        fill="white"
        maxlength="16"
        @input="$emit('name-input', $event)"
        @blur.native="$emit('name-blur')"
      />
      <span v-else>{{ name }}</span>
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
      <span class="balance-value">{{ balance | prefixedAmount }}</span>
    </template>
  </ae-card>
</template>

<script>
import { AeAddress, AeIdenticon, AeInputPlain, AeLabel } from '@aeternity/aepp-components-3';
import BigNumber from 'bignumber.js';
import AeCard from './AeCard.vue';
import prefixedAmount from '../filters/prefixedAmount';

export default {
  components: {
    AeAddress,
    AeIdenticon,
    AeCard,
    AeInputPlain,
    AeLabel,
  },
  filters: { prefixedAmount },
  props: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    balance: {
      type: BigNumber,
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
    nameEditable: {
      type: Boolean,
      default: false,
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
    align-items: center;
    padding: rem(12px) rem(16px) 0 rem(12px);
    margin-bottom: rem(12px);

    .slot-icon {
      margin-left: auto;
    }

    span {
      @extend %face-sans-base;
      color: $color-neutral-maximum;
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
      margin-bottom: rem(4px);
      font-weight: bold;
    }

    .ae-address {
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
      margin-left: rem(5px);
      content: 'AE';
    }
  }
}
</style>
