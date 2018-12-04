<template>
  <ae-modal-light
    title="Confirm your Ledger address"
    class="ledger-address-confirm"
  >
    Check your Ledger and confirm if the address below is the same
    <div class="address-confirm">
      <div class="label">
        Address from: <strong>Ledger</strong>
      </div>
      <ae-address
        :value="address"
      />
    </div>
    <ae-button
      slot="buttons"
      size="large"
      fill="primary"
      uppercase
    >
      Confirm address
    </ae-button>
  </ae-modal-light>
</template>

<script>
import { AeIcon, AeAddress } from '@aeternity/aepp-components-3';
import AeModalLight from '../AeModalLight.vue';
import AeButton from '../AeButton.vue';

export default {
  components: {
    AeModalLight,
    AeButton,
    AeIcon,
    AeAddress,
  },
  props: {
    address: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.ledger-address-confirm {
  .address-confirm {
    margin: rem(60px) 0;
    padding: rem(20px);
    padding-top: rem(10px);
    background-color: $color-neutral-positive-3;
    border-radius: rem(4px);

    .label {
      margin-bottom: rem(8px);
      color: $color-focus;
    }

    .ae-address {
      grid-template-columns: repeat(9, 1fr);
      grid-column-gap: rem(19px);
      font-weight: normal;
    }
  }

  .ae-button {
    width: rem(400px);
  }
}
</style>
