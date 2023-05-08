<template>
  <div class="tab-bar">
    <ConnectionStatus />

    <div class="wrapper">
      <ButtonPlain :to="{ name: 'app-browser' }">
        <Grid />
        <div>{{ $t('app.title') }}</div>
      </ButtonPlain>

      <ButtonPlain :to="{ name: 'transfer' }">
        <Transfer />
        <div>{{ $t('transfer.title') }}</div>
      </ButtonPlain>

      <ButtonPlain
        :class="showAccountSwitcher ? 'router-link-active' : ''"
        @click="accountSwitcher"
      >
        <AeIdenticon :address="activeAccount.address" />
      </ButtonPlain>

      <ButtonPlain :to="{ name: 'name-list' }">
        <Contacts />
        <div>{{ $t('name.title') }}</div>
      </ButtonPlain>

      <ButtonPlain :to="{ name: 'settings' }">
        <MnemonicBackupWarning><Settings /></MnemonicBackupWarning>
        <div>{{ $t('settings.title') }}</div>
      </ButtonPlain>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ButtonPlain from '../ButtonPlain.vue';
import {
  Grid, Transfer, Contacts, Settings,
} from '../icons';
import AeIdenticon from '../AeIdenticon.vue';
import ConnectionStatus from '../ConnectionStatus.vue';
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
  computed: mapGetters({ activeAccount: 'accounts/active' }),
  methods: {
    accountSwitcher() {
      if (this.showAccountSwitcher) return;
      this.$store.dispatch('modals/open', { name: 'accountSwitcher' }).catch((error) => {
        if (error.message === 'User navigated outside') return;
        throw error;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@use '../../styles/variables';
@use '../../styles/functions';

.tab-bar {
  background-color: variables.$color-neutral-minimum;
  padding-bottom: env(safe-area-inset-bottom);

  .wrapper {
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    max-width: variables.$screen-phone;
    margin: 0 auto;
    padding: 10px;

    .button-plain {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: functions.rem(52px);
      font-family: variables.$font-sans;
      font-size: 11px;
      font-weight: 500;
      line-height: 1.45;
      letter-spacing: 0.2px;
      color: variables.$color-neutral-negative-1;

      &:disabled {
        color: variables.$color-neutral-negative-3;
      }

      div {
        margin-top: 4px;
      }

      .ae-identicon {
        width: 42px;
        height: 42px;
        border: 2px solid #000;
        box-shadow: 0 0 0 2px variables.$color-primary;
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
