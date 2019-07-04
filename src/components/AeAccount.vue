<template>
  <AeCard
    :fill="fill"
    class="ae-account"
  >
    <header>
      <AeIdenticon :address="address" />
      <form
        v-if="nameEditable"
        @submit.prevent="$emit('name-blur')"
      >
        <AeInputPlain
          v-focus="nameEditable"
          :value="name"
          placeholder="Account name"
          fill="light"
          maxlength="16"
          @input="$emit('name-input', $event)"
          @blur.native="$emit('name-blur')"
        />
      </form>
      <span v-else>
        {{ name }}
      </span>
      <div class="slot-icon">
        <slot name="icon" />
      </div>
    </header>

    <main>
      <AeAddress
        :address="address"
        length="medium"
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
import { focus } from 'vue-focus';
import BigNumber from 'bignumber.js';
import AeCard from './AeCard.vue';
import AeIdenticon from './AeIdenticon.vue';
import AeInputPlain from './AeInputPlain.vue';
import AeAddress from './AeAddress.vue';
import Balance from './Balance.vue';

export default {
  directives: { focus },
  components: {
    AeCard,
    AeIdenticon,
    AeInputPlain,
    AeAddress,
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
    nameEditable: Boolean,
    source: {
      type: Object,
      required: true,
    },
  },
  computed: mapState('accounts', {
    fill(state, { getColor }) { return getColor(this); },
  }),
};
</script>

<style lang="scss" scoped>
@import '../styles/placeholders/typography.scss';
@import '../styles/variables/colors.scss';

.ae-account.ae-card {
  header {
    display: flex;
    align-items: center;
    margin: rem(12px) rem(16px);
    color: $color-neutral-maximum;

    .slot-icon {
      margin-left: auto;
    }

    span {
      @extend %face-sans-base;
    }

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
