<template>
  <div class="connect-guide">
    <template v-if="!forLedger">
      <Guide size="small">
        How to connect from <em>Base æpp</em>
      </Guide>
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
        Go to Settings <span class="icon-wrapper settings"><Settings /></span>
      </Guide>
      <Guide size="small">
        <AeFraction
          slot="icon"
          numerator="4"
          denominator="5"
        />
        Tap on Remote Connections <span class="icon-wrapper device"><Device /></span>
        and tap the ‘+’
      </Guide>
      <Guide size="small">
        <AeFraction
          slot="icon"
          numerator="5"
          denominator="5"
        />
        Scan the QR code below with Base æpp
      </Guide>
      <AeQrCode :data="peerId" />
    </template>

    <template v-else-if="ledgerSupported">
      <Guide size="small">
        How to connect from <em>Ledger</em>
      </Guide>
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
        Create a first account by pressing the button below
      </Guide>
      <ListItem
        title="Create a new account"
        @click="create"
      >
        <ListItemCircle slot="icon">
          <Plus />
        </ListItemCircle>
      </ListItem>
    </template>

    <div
      v-else
      class="no-ledger-support"
    >
      <img src="../../assets/switch-to-chrome.svg">
      <Guide>
        Please switch to
        Google&nbsp;Chrome
      </Guide>
      <Note>
        Interacting with the Ledger is only
        <br>supported by Chrome for now.
      </Note>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Guide from '../Guide.vue';
import { AeQrCode } from '../async';
import AeFraction from '../AeFraction.vue';
import ListItem from '../ListItem.vue';
import ListItemCircle from '../ListItemCircle.vue';
import { Settings, Device, Plus } from '../icons';
import Note from '../Note.vue';

export default {
  components: {
    Guide,
    AeQrCode,
    AeFraction,
    Settings,
    Device,
    Note,
    Plus,
    ListItem,
    ListItemCircle,
  },
  props: {
    forLedger: Boolean,
  },
  computed: mapState({
    peerId: ({ peerId }) => peerId,
    ledgerSupported: ({ desktop }) => desktop.ledgerSupported,
  }),
  methods: mapActions('accounts/ledger', ['create']),
};
</script>

<style scoped lang="scss">
@import '../../styles/variables/colors.scss';
@import '../../styles/placeholders/typography.scss';

.connect-guide {
  margin: rem(40px) rem(40px);

  .guide .icon-wrapper {
    display: inline-block;
    width: rem(23px);
    height: rem(23px);
    line-height: rem(23px);
    border-radius: rem(5px);
    font-size: 0;
    text-align: center;
    vertical-align: middle;
    color: $color-neutral-positive-2;

    &.settings {
      background-color: $color-neutral-minimum;
    }

    &.device {
      background-color: $color-alternative;
    }

    .icon {
      height: rem(15px);
    }
  }

  .ae-qr-code {
    width: rem(216px);
    margin: rem(40px) auto;
  }

  .no-ledger-support {
    text-align: center;

    img {
      margin-top: rem(60px);
      margin-bottom: rem(20px);
    }

    .guide {
      display: block;
      margin-bottom: rem(10px);
    }
  }
}
</style>
