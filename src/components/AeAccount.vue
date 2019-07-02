<template>
  <AeCard
    v-copy-on-click="address"
    :fill="fill"
    class="ae-account"
  >
    <header>
      <AeIdenticon :address="address" />
      {{ name }}
    </header>

    <main>
      <AeAddress
        :address="address"
        length="medium"
        disable-copy-on-click
      />
    </main>

    <Balance
      slot="toolbar"
      :balance="balance"
      invert
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
@import './address-copied.scss';

.ae-account.ae-card {
  &.v-copied {
    @extend %address-copied;
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
