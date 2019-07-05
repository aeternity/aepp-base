<template>
  <MobilePage
    class="settings"
    fill="neutral"
  >
    <Guide>
      <em>{{ $t('settings.title') }}</em>
    </Guide>
    <AeCard fill="maximum">
      <ListItem
        :to="{ name: 'settings-network' }"
        :subtitle="networkName"
        :title="$t('network.settings.title')"
        class="network"
      >
        <ListItemCircle slot="icon">
          <Network />
        </ListItemCircle>
        <LeftMore slot="right" />
      </ListItem>
      <ListItem
        :to="{ name: 'settings-remote-connection' }"
        :title="$t('remote-connection.settings.title')"
        :subtitle="$tc('remote-connection.settings.count', remoteConnectionsCount)"
        class="remote-connection"
      >
        <ListItemCircle slot="icon">
          <Device />
        </ListItemCircle>
        <LeftMore slot="right" />
      </ListItem>
      <ListItem
        :to="{ name: 'settings-app-list' }"
        :title="$t('app.settings.title')"
        :subtitle="$tc('app.settings.count', appsAccountAccessCount)"
        class="app-list"
      >
        <ListItemCircle slot="icon">
          <Grid />
        </ListItemCircle>
        <LeftMore slot="right" />
      </ListItem>
      <ListItem
        :to="{ name: 'settings-security-course-list' }"
        :title="$t('security-courses.settings.title')"
        :subtitle="$t('security-courses.settings.subtitle')"
        class="courses"
      >
        <ListItemCircle slot="icon">
          <LockOpen />
        </ListItemCircle>
        <LeftMore slot="right" />
      </ListItem>
      <ListItem
        :to="{ name: mnemonic ? 'settings-mnemonic' : 'settings-mnemonic-deleted' }"
        :title="$t('settings.mnemonic.title')"
        :subtitle="$t('settings.mnemonic.subtitle')"
        class="mnemonic"
      >
        <MnemonicBackupWarning slot="icon">
          <ListItemCircle>
            <Key />
          </ListItemCircle>
        </MnemonicBackupWarning>
        <LeftMore slot="right" />
      </ListItem>
      <ListItem
        :to="{ name: 'settings-password' }"
        :title="$t('settings.password.title')"
        :subtitle="$t('settings.password.subtitle')"
        class="password"
      >
        <ListItemCircle slot="icon">
          <Shield />
        </ListItemCircle>
        <LeftMore slot="right" />
      </ListItem>
      <ListItemSettingsLanguage :to="{ name: 'settings-language' }">
        <LeftMore />
      </ListItemSettingsLanguage>
    </AeCard>

    <template v-if="removableAccounts.length">
      <h2>{{ $t('settings.account-remove.title') }}</h2>
      <AeCard fill="maximum">
        <ListItemAccount
          v-for="account in removableAccounts"
          :key="account.idx"
          v-bind="account"
          subtitle="address"
          :to="{ name: 'settings-account-remove', params: { idx: account.idx } }"
        >
          <LeftMore slot="right" />
        </ListItemAccount>
      </AeCard>
    </template>

    <h2>{{ $t('settings.account') }}</h2>
    <AeCard fill="maximum">
      <ListItem
        v-if="isWalletEncrypted"
        :title="$t('settings.logout')"
        :subtitle="$t('settings.logout-subtitle')"
        class="logout"
        @click="logout"
      >
        <ListItemCircle slot="icon">
          <Share />
        </ListItemCircle>
      </ListItem>
      <ListItemSettingsReset />
    </AeCard>
    <SettingsVersion />
  </MobilePage>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { get } from 'lodash-es';
import AeCard from '../../components/AeCard.vue';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import ListItem from '../../components/ListItem.vue';
import ListItemCircle from '../../components/ListItemCircle.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import ListItemSettingsReset from '../../components/ListItemSettingsReset.vue';
import ListItemSettingsLanguage from '../../components/ListItemSettingsLanguage.vue';
import MnemonicBackupWarning from '../../components/mobile/MnemonicBackupWarning.vue';
import SettingsVersion from '../../components/SettingsVersion.vue';
import {
  Network, LeftMore, Device, Grid, Key, Share, LockOpen, Shield,
} from '../../components/icons';

export default {
  components: {
    MobilePage,
    Guide,
    AeCard,
    ListItem,
    ListItemCircle,
    ListItemAccount,
    ListItemSettingsReset,
    ListItemSettingsLanguage,
    MnemonicBackupWarning,
    SettingsVersion,
    Network,
    LeftMore,
    Device,
    Grid,
    Key,
    Share,
    LockOpen,
    Shield,
  },
  computed: mapState({
    networkName: (state, { currentNetwork }) => currentNetwork.name,
    remoteConnectionsCount: ({ mobile }) => Object
      .entries(mobile.followers).filter(([, f]) => f.connected).length,
    appsAccountAccessCount: ({ apps }) => apps
      .filter(app => get(app, 'permissions.accessToAccounts.length', 0)).length,
    mnemonic: ({ accounts: { hdWallet: { mnemonic } } }) => mnemonic,
    removableAccounts: ({ accounts: { list } }) => list
      .map((account, idx) => ({ ...account, idx }))
      .filter(({ source: { type } }) => type !== 'hd-wallet'),
    isWalletEncrypted: (state, getters) => getters['accounts/hdWallet/isWalletEncrypted'],
  }),
  methods: mapActions(['logout']),
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables/colors.scss';

.settings {
  .list-item {
    &.network, &.mnemonic {
      .list-item-circle {
        background-color: $color-secondary;
      }
    }

    &.remote-connection, &.password {
      .list-item-circle {
        background-color: #515ec8;
      }
    }

    &.app-list .list-item-circle {
      background-color: #f8963d;
    }

    &.courses .list-item-circle {
      background-color: $color-alternative;
    }

    &.logout .list-item-circle {
      transform: rotate(90deg);
      background-color: $color-secondary;
    }
  }
}
</style>
