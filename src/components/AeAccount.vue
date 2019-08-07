<template>
  <AeCard
    :fill="fill"
    class="ae-account"
  >
    <div v-copy-on-click="address">
      <header>
        <AeIdenticon :address="address" />
        {{ name }}
      </header>

      <main>
        <AeAddress
          :address="address"
          mode="three-columns-short"
          disable-copy-on-click
        />
      </main>
    </div>

    <Balance
      slot="toolbar"
      :balance="balance"
      invert
      convertable
      left-visible
    />
  </AeCard>
</template>

<script>
import { mapState } from 'vuex';
import BigNumber from 'bignumber.js';
import copyOnClick from '../directives/copyOnClick';
import AeCard from './AeCard.vue';
import AeIdenticon from './AeIdenticon.vue';
import AeAddress from './AeAddress.vue';
import Balance from './Balance.vue';

export default {
  directives: { copyOnClick },
  components: {
    AeCard,
    AeIdenticon,
    AeAddress,
    Balance,
  },
  props: {
    address: {
      type: String,
      required: true,
    },
    balance: {
      type: BigNumber,
      required: true,
    },
    source: {
      type: Object,
      required: true,
    },
  },
  computed: mapState('accounts', {
    fill(state, { getColor }) { return getColor(this); },
    name(state, { getName }) { return getName(this); },
  }),
};
</script>

<style lang="scss" scoped>
@import '../styles/placeholders/typography.scss';
@import '../styles/variables/colors.scss';
@import './copied.scss';

.ae-account.ae-card {
  div.v-copied {
    overflow: hidden;
    @extend %copied;
  }

  header {
    display: flex;
    align-items: center;
    margin: rem(12px) rem(16px);
    @extend %face-sans-base;
    color: $color-neutral-maximum;

    .ae-identicon {
      margin-right: rem(8px);
    }
  }

  main {
    display: flex;
    justify-content: flex-end;
    margin: rem(32px) rem(16px) rem(8px) rem(16px);
  }

  /deep/ .ae-toolbar {
    text-align: right;
  }
}
</style>
