<template>
  <div class="receive">
    <Guide
      :template="$t('transfer.receive.guide-desktop')"
      size="big"
    />

    <Note>
      {{ $t('transfer.receive.note') }}
    </Note>

    <AeCard fill="maximum">
      <AeQrCode
        :class="{ inactive: !account }"
        :data="address"
      />

      <AeAddressPanel :address="address" />

      <AeButton
        v-copy-on-click="address"
        :disabled="!account"
        fill="secondary"
      >
        {{ $t('transfer.receive.copy') }}
      </AeButton>

      <AeButton
        v-if="!account"
        plain
        class="connect-an-account"
        @click="toggleSidebar"
      >
        {{ $t('transfer.receive.connect-account') }}
      </AeButton>
    </AeCard>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import copyOnClick from '../../directives/copyOnClick';
import Guide from '../../components/Guide.vue';
import Note from '../../components/Note.vue';
import AeButton from '../../components/AeButton.vue';
import AeCard from '../../components/AeCard.vue';
import { AeQrCode } from '../../components/async';
import AeAddressPanel from '../../components/desktop/AeAddressPanel.vue';

export default {
  components: {
    Guide, Note, AeButton, AeCard, AeQrCode, AeAddressPanel,
  },
  directives: {
    copyOnClick,
  },
  computed: {
    ...mapGetters({ account: 'accounts/active' }),
    address() {
      return this.account ? this.account.address : `ak_${'·'.repeat(50)}`;
    },
  },
  methods: mapMutations(['toggleSidebar']),
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.receive {
  .ae-card {
    margin: 0 rem(-15px);
    padding: rem(60px);

    .ae-qr-code, .ae-address-panel, .ae-button {
      margin-left: auto;
      margin-right: auto;
    }

    .ae-qr-code {
      width: rem(260px);
      margin-bottom: rem(50px);

      &.inactive {
        opacity: 0.2;
      }
    }

    .ae-address-panel {
      margin-bottom: rem(50px);
    }

    .ae-button {
      display: block;
      width: rem(310px);
    }

    .ae-button.connect-an-account {
      margin-top: rem(12px);
      color: $color-neutral-minimum;
    }
  }
}
</style>
