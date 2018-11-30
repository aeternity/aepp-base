<template>
  <ae-card
    :fill="qrSide ? 'neutral' : 'primary'"
    class="ae-account">
    <header v-if="!qrSide">
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

    <main :class="qrSide && 'mainQr'">
      <ae-q-r-code
        v-if="qrSide"
        :options="{ size: 136 }"
        :value="address"
      />
      <ae-address
        :class="qrSide && 'addressQr'"
        :value="address"
        :length="qrSide ? '' : 'medium'"
        gap="0"
      />
    </main>

    <template slot="toolbar">
      <span class="balance-title">{{ qrSide ? name : '' }}</span>
      <balance
        v-if="!qrSide"
        :balance="balance"
        invert
      />
    </template>
  </ae-card>
</template>

<script>
import {
  AeAddress, AeIdenticon, AeInputPlain,
  AeLabel, AeQRCode,
} from '@aeternity/aepp-components-3';
import BigNumber from 'bignumber.js';
import AeCard from './AeCard.vue';
import Balance from './Balance.vue';

export default {
  components: {
    AeAddress,
    AeIdenticon,
    AeCard,
    AeInputPlain,
    AeLabel,
    Balance,
    AeQRCode,
  },
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
    nameEditable: {
      type: Boolean,
      default: false,
    },
    qrSide: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.ae-account {
  position: relative;

  &.ae-card {
    header {
      display: flex;
      align-items: center;
      margin: rem(12px) rem(16px);

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
      align-items: center;
      padding: rem(24px) rem(8px) rem(12px) rem(12px);

      .security-status {
        @extend %face-uppercase-xs;
        white-space: pre-line;
        margin-bottom: rem(4px);
        font-weight: bold;
      }

      .ae-address {
        margin-left: auto;
        width: rem(150px);
      }

      &.mainQr {
        padding-top: rem(8px);
      }
    }

    .ae-identicon {
      margin-right: rem(8px);
    }
  }

  main {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: rem(32px) rem(8px) rem(8px) rem(16px);

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

  /deep/ .ae-toolbar {
    text-align: right;
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
}
</style>
