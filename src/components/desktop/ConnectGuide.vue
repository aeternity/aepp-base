<template>
  <div class="connect-guide">
    <template v-if="!forLedger">
      <guide size="small">
        How to connect the <em>Base æpp</em>
      </guide>
      <div class="steps">
        <guide size="small">
          <ae-fraction
            slot="icon"
            numerator="1"
            denominator="4"
          />
          Open the Base æpp on your mobile device
        </guide>
        <guide size="small">
          <ae-fraction
            slot="icon"
            numerator="2"
            denominator="4"
          />
          Go to Settings <ae-icon name="settings" /> in the tabbar
        </guide>
        <guide size="small">
          <ae-fraction
            slot="icon"
            numerator="3"
            denominator="4"
          />
          Click on Remote Connections <ae-icon name="device" /> and add a new one
        </guide>
        <guide size="small">
          <ae-fraction
            slot="icon"
            numerator="4"
            denominator="4"
          />
          Scan the QR code below
        </guide>
      </div>
      <ae-qr-code
        :data="peerId"
        :size="240"
      />
    </template>

    <template v-else>
      <guide size="small">
        How to connect the <em>Ledger</em>
      </guide>
      <div class="steps">
        <guide size="small">
          <ae-fraction
            slot="icon"
            numerator="1"
            denominator="2"
          />
          Connect the Ledger via USB and unlock on the device
        </guide>
        <guide size="small">
          <ae-fraction
            slot="icon"
            numerator="2"
            denominator="2"
          />
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
import AeFraction from '../AeFraction.vue';

export default {
  components: {
    AeIcon, Guide, AeQrCode, AeFraction,
  },
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

  .steps .guide .ae-icon {
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

  .ae-qr-code {
    margin: rem(40px) auto;
  }
}
</style>
