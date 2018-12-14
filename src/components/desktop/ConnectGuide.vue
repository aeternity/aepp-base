<template>
  <div class="connect-guide">
    <template v-if="!forLedger">
      <guide>
        How to connect the <em>Base æpp</em>
      </guide>
      <div class="steps">
        <guide icon="¼">
          Open the Base æpp on your mobile device
        </guide>
        <guide icon="½">
          Go to Settings <ae-icon name="settings" /> in the tabbar
        </guide>
        <guide icon="¾">
          Click on Remote Connections <ae-icon name="device" /> and add a new one
        </guide>
        <guide icon="1">
          Scan the QR code below
        </guide>
      </div>
      <ae-qr-code
        :data="peerId"
        :size="240"
      />
    </template>

    <template v-else>
      <guide>
        How to connect the <em>Ledger</em>
      </guide>
      <div class="steps">
        <guide icon="½">
          Connect the Ledger via USB and unlock on the device
        </guide>
        <guide icon="1">
          Open the æternity app on the Ledger
        </guide>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import Guide from '../Guide.vue';
import AeQrCode from '../AeQrCode.vue';

export default {
  components: { AeIcon, Guide, AeQrCode },
  props: {
    forLedger: { type: Boolean, default: false },
  },
  computed: mapState({
    peerId: ({ desktop }) => desktop.peerId,
  }),
};
</script>

<style scoped lang="scss">
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.connect-guide {
  margin: rem(60px) rem(40px);

  .guide {
    font-size: rem(17px);
    margin-bottom: rem(20px);
  }

  .steps .guide {
    margin-left: rem(40px);

    .ae-icon {
      width: rem(23px);
      height: rem(23px);
      border-radius: rem(5px);
      font-size: rem(15px);
      vertical-align: middle;
      color: $color-neutral-positive-2;

      &-settings {
        background-color: $color-neutral-minimum;
      }

      &-device {
        background-color: $color-alternative;
      }
    }
  }

  .ae-qr-code {
    margin: rem(40px) auto;
  }
}
</style>
