<template>
  <div class="tab-bar">
    <ConnectionStatus />

    <div class="wrapper">
      <ButtonPlain :to="browserPath || { name: 'app-intro' }">
        <Grid />
        <div>æpps</div>
      </ButtonPlain>

      <ButtonPlain :to="{ name: 'transfer' }">
        <Transfer />
        <div>Transfer</div>
      </ButtonPlain>

      <ButtonPlain
        :class="showAccountSwitcher ? 'router-link-active' : ''"
        @click="accountSwitcher"
      >
        <AeIdenticon :address="activeAccount.address" />
      </ButtonPlain>

      <ButtonPlain disabled>
        <Contacts />
        <div>Contacts</div>
      </ButtonPlain>

      <ButtonPlain :to="{ name: 'settings' }">
        <MnemonicBackupWarning><Settings /></MnemonicBackupWarning>
        <div>Settings</div>
      </ButtonPlain>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ButtonPlain from '../ButtonPlain.vue';
import {
  Grid, Transfer, Contacts, Settings,
} from '../icons';
import AeIdenticon from '../AeIdenticon.vue';
import ConnectionStatus from './ConnectionStatus.vue';
import MnemonicBackupWarning from './MnemonicBackupWarning.vue';

export default {
  components: {
    AeIdenticon,
    ButtonPlain,
    Grid,
    Transfer,
    Contacts,
    Settings,
    ConnectionStatus,
    MnemonicBackupWarning,
  },
  props: {
    showAccountSwitcher: Boolean,
  },
  computed: {
    ...mapGetters({ activeAccount: 'accounts/active' }),
    ...mapState({
      browserPath: ({ mobile }) => mobile.browserPath,
    }),
  },
  methods: {
    accountSwitcher() {
      if (this.showAccountSwitcher) return;
      this.$store.dispatch('modals/open', { name: 'accountSwitcher' }).catch(() => {});
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../styles/variables/typography.scss';
@import '../../styles/variables/colors.scss';
@import '../../styles/fallback/variables.scss';

.tab-bar {
  background-color: $color-neutral-minimum;
  padding-bottom: env(safe-area-inset-bottom);

  .wrapper {
    display: flex;
    align-items: center;
    max-width: $screen-phone;
    margin: 0 auto;
    padding: 10px;

    .button-plain {
      flex-grow: 1;
      flex-basis: 0;
      font-family: $font-sans;
      font-size: 11px;
      font-weight: 500;
      line-height: 1.45;
      letter-spacing: 0.2px;
      color: $color-neutral-negative-1;
      text-align: center;

      &:disabled {
        color: $color-neutral-negative-3;
      }

      div {
        margin-top: 4px;
      }

      .ae-identicon {
        width: 42px;
        height: 42px;
        border: 2px solid #000;
        box-shadow: 0 0 0 2px $color-primary;
        margin: 2px;
        vertical-align: middle;
      }

      &.router-link-active {
        color: #fff;

        .ae-identicon {
          box-shadow: 0 0 0 2px #fff;
        }
      }
    }
  }
}
</style>
