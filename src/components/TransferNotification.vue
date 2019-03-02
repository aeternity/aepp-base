<template>
  <Transition
    appear
    name="fade"
  >
    <div class="transfer-notification">
      <div class="content">
        <AeIcon
          fill="alternative"
          face="round"
          name="check"
        />
        <div class="title">
          Transaction completed
          <div class="subtitle">
            You've sent {{ amount | prefixedAmount }} AE
          </div>
        </div>
      </div>

      <div class="footer">
        <AeButton
          :to="`https://explorer.aepps.com/#/tx/${transactionHash}`"
          fill="dark"
          size="small"
          plain
        >
          View on explorer
        </AeButton>
        <AeButton
          v-copy-on-click="transactionHash"
          fill="dark"
          size="small"
          plain
        >
          Copy tx hash
        </AeButton>
      </div>
    </div>
  </Transition>
</template>

<script>
import BigNumber from 'bignumber.js';
import { AeIcon } from '@aeternity/aepp-components-3';
import AeButton from './AeButton.vue';
import prefixedAmount from '../filters/prefixedAmount';
import copyOnClick from '../directives/copyOnClick';

export default {
  components: {
    AeIcon,
    AeButton,
  },
  directives: { copyOnClick },
  filters: { prefixedAmount },
  props: {
    amount: {
      type: BigNumber,
      default: BigNumber(0),
    },
    transactionHash: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/typography.scss';

.transfer-notification {
  &.fade-enter-active, &.fade-leave-active {
    transition: opacity 0.25s ease-out;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }

  position: fixed;
  top: 0;
  left: rem(10px);
  right: rem(10px);
  border-radius: 0 0 rem(8px) rem(8px);
  background-color: $color-neutral-maximum;
  box-shadow: 0 0 rem(100px) rem(30px) rgba(146, 156, 166, 0.4);

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
    display: flex;
    padding: rem(8px) 0;
    background-color: $color-neutral-positive-2;
    border-radius: 0 0 rem(8px) rem(8px);

    .ae-button {
      flex-grow: 1;
      flex-basis: 0;
      height: rem(20px);
      line-height: rem(20px);
      font-size: rem(11px);
      font-weight: 500;
      letter-spacing: rem(1.1px);
      color: $color-neutral-negative-3;

      &:first-child {
        border-right: 1px solid $color-neutral-positive-1;
      }
    }
  }
}
</style>
