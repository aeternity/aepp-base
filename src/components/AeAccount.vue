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

    <balance
      slot="toolbar"
      :balance="balance"
      invert
    />
  </ae-card>
</template>

<script>
import { AeAddress, AeIdenticon, AeInputPlain, AeLabel } from '@aeternity/aepp-components-3';
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
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.ae-account.ae-card {
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
  }
}
</style>
