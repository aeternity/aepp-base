<template>
  <transition
    appear
    name="fade"
  >
    <div class="transfer-notification">
      <div class="content">
        <ae-icon
          fill="alternative"
          face="round"
          name="check"
        />
        <div class="title">
          Transaction completed
          <div class="subtitle">You've sent {{ amount.toString() }} AE</div>
        </div>
      </div>

      <div class="footer">
        <ae-button
          :to="`https://explorer.aepps.com/#/tx/${tx}`"
          fill="neutral"
          plain
        >
          View on explorer
        </ae-button>
        <ae-button
          fill="neutral"
          plain
          @click="copyTx"
        >
          Copy tx hash
        </ae-button>
      </div>
    </div>
  </transition>
</template>

<script>
import BigNumber from 'bignumber.js';
import copy from 'clipboard-copy';
import { AeIcon } from '@aeternity/aepp-components-3';
import AeButton from '../components/AeButton.vue';

export default {
  components: {
    AeIcon,
    AeButton,
  },
  props: {
    tx: {
      type: String,
      default: '',
    },
    amount: {
      type: BigNumber,
      default: BigNumber(0),
    },
  },
  data: () => ({
    migratedBalance: '',
  }),
  methods: {
    copyTx() {
      copy(this.tx);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.transfer-notification {
  &.fade-enter-active {
    transition: opacity 0.25s ease-out;
  }

  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-to {
    opacity: 1;
  }

  position: fixed;
  top: 0;
  left: rem(10px);
  right: rem(10px);
  border-radius: 0 0 rem(8px) rem(8px);
  background-color: $color-neutral-maximum;
  box-shadow: 0 0px 100px 30px rgba(146, 156, 166, 0.4);

  .content {
    display: flex;
    align-items: center;
    padding: 0 rem(14px);
    height: rem(68px);
    @extend %face-sans-s;
    font-weight: 500;

    .title {
      margin-left: rem(12px);
      @extend %face-sans-s;
      font-weight: 500;
      color: $color-neutral-negative-3;

      .subtitle {
        display: block;
        @extend %face-sans-xs;
        letter-spacing: normal;
        color: $color-neutral-negative-1;
      }
    }
  }

  .footer {
    padding: 8px 0;
    background-color: $color-neutral-positive-2;
    border-radius: 0 0 rem(8px) rem(8px);

    .ae-button {
      padding-top: 4px;
      width: 49%;
      height: rem(20px);
      border-radius: 0;

      &:first-child {
        border-right: 1px solid $color-neutral-positive-1;
      }

      /deep/ .label {
        @extend %face-sans-xs;
        font-size: rem(11px);
        font-weight: 500;
        letter-spacing: rem(1.1px);
        color: $color-neutral-negative-3;
      }
    }
  }
}
</style>
