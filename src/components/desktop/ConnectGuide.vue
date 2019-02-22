<template>
  <div class="connect-guide">
    <template v-if="!forLedger">
      <Guide size="small">
        How to connect from <em>Base æpp</em>
      </Guide>
      <div class="steps">
        <Guide size="small">
          <AeFraction
            slot="icon"
            numerator="1"
            denominator="5"
          />
          Open Base æpp on your phone: base.aepps.com
        </Guide>
        <Guide size="small">
          <AeFraction
            slot="icon"
            numerator="2"
            denominator="5"
          />
          Create an account, or login
        </Guide>
        <Guide size="small">
          <AeFraction
            slot="icon"
            numerator="3"
            denominator="5"
          />
          Go to Settings <AeIcon name="settings" />
        </Guide>
        <Guide size="small">
          <AeFraction
            slot="icon"
            numerator="4"
            denominator="5"
          />
          Tap on Remote Connections <AeIcon name="device" /> and tap the ‘+’
        </Guide>
        <Guide size="small">
          <AeFraction
            slot="icon"
            numerator="5"
            denominator="5"
          />
          Scan the QR code below with Base æpp
        </Guide>
      </div>
      <AeQrCode
        :data="peerId"
        :size="240"
      />
    </template>

    <template v-else>
      <Guide size="small">
        How to connect from <em>Ledger</em>
      </Guide>
      <div class="steps">
        <Guide size="small">
          <AeFraction
            slot="icon"
            numerator="1"
            denominator="3"
          />
          Connect your Ledger via USB and unlock it
        </Guide>
        <Guide size="small">
          <AeFraction
            slot="icon"
            numerator="2"
            denominator="3"
          />
          Open the æternity app on your Ledger
        </Guide>
        <Guide size="small">
          <AeFraction
            slot="icon"
            numerator="3"
            denominator="3"
          />
          Confirm your Ledger address
        </Guide>
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
