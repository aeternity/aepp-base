<template>
  <div class="connect-guide">
    <template v-if="!forLedger">
      <Guide
        :template="$t('remote-connection.connect-guide.title')"
        size="small"
      />

      <Guide
        v-for="(step, idx) in $t('remote-connection.connect-guide.steps')"
        :key="idx"
        :template="step"
        size="small"
      >
        <AeFraction
          slot="icon"
          :numerator="idx + 1"
          :denominator="$t('remote-connection.connect-guide.steps').length"
        />
        <span
          slot="icon-settings"
          class="icon-wrapper settings"
        ><Settings /></span>
        <span
          slot="icon-device"
          class="icon-wrapper device"
        >
          <Device />
        </span>
      </Guide>

      <AeQrCode :data="peerId" />
    </template>

    <template v-else-if="ledgerSupported">
      <Guide
        :template="$t('ledger.connect-guide.title')"
        size="small"
      />

      <Guide
        v-for="(step, idx) in $t('ledger.connect-guide.steps')"
        :key="idx"
        :template="step"
        size="small"
      >
        <AeFraction
          slot="icon"
          :numerator="idx + 1"
          :denominator="$t('ledger.connect-guide.steps').length"
        />
      </Guide>

      <ListItem
        :title="$t('account-switcher.create-account-desktop')"
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
      <Guide :template="$t('ledger.not-supported.guide')" />
      <Note>
        {{ $t('ledger.not-supported.note') }}
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
