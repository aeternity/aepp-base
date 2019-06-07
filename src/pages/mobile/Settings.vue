<template>
  <MobilePage
    class="settings"
    fill="neutral"
  >
    <Guide>
      <em>Settings</em>
    </Guide>
    <AeCard fill="maximum">
      <ListItem
        :to="{ name: 'settings-network' }"
        :subtitle="networkName"
        title="Network"
        class="network"
      >
        <ListItemCircle slot="icon">
          <Globe />
        </ListItemCircle>
        <LeftMore slot="right" />
      </ListItem>
      <ListItem
        :to="{ name: 'settings-remote-connection' }"
        :subtitle="remoteConnectionsSubtitle"
        title="Remote connections"
        class="remote-connection"
      >
        <ListItemCircle slot="icon">
          <Device />
        </ListItemCircle>
        <LeftMore slot="right" />
      </ListItem>
      <ListItem
        :to="{ name: 'settings-app-list' }"
        :subtitle="appsAccountAccessSubtitle"
        title="Aepp account access"
        class="app-list"
      >
        <ListItemCircle slot="icon">
          <Grid />
        </ListItemCircle>
        <LeftMore slot="right" />
      </ListItem>
      <ListItem
        :to="{ name: 'settings-security-course-list' }"
        subtitle="Disclaimer and information"
        title="AE Security Courses"
        class="courses"
      >
        <ListItemCircle slot="icon">
          <LockOpen />
        </ListItemCircle>
        <LeftMore slot="right" />
      </ListItem>
      <ListItem
        :to="{ name: mnemonic ? 'settings-mnemonic' : 'settings-mnemonic-deleted' }"
        subtitle="Secure your funds"
        title="Backup Recovery Phrase"
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
        subtitle="Setup and manage a password"
        title="Wallet Authentication"
        class="password"
      >
        <ListItemCircle slot="icon">
          <Shield />
        </ListItemCircle>
        <LeftMore slot="right" />
      </ListItem>
    </AeCard>

    <template v-if="removableAccounts.length">
      <h2>Synced Wallets</h2>
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

    <h2>Account</h2>
    <AeCard fill="maximum">
      <ListItem
        title="Logout"
        subtitle="And see you soon!"
        class="logout"
        @click="logout"
      >
        <ListItemCircle slot="icon">
          <Share />
        </ListItemCircle>
      </ListItem>
      <ListItemSettingsReset />
    </AeCard>

    <div class="version">
      Version {{ version }}
    </div>
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
import MnemonicBackupWarning from '../../components/mobile/MnemonicBackupWarning.vue';
import {
  Globe, LeftMore, Device, Grid, Key, Share, LockOpen, Shield,
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
    MnemonicBackupWarning,
    Globe,
    LeftMore,
    Device,
    Grid,
    Key,
    Share,
    LockOpen,
    Shield,
  },
  data: () => ({
    version: process.env.npm_package_version,
  }),
  computed: mapState({
    networkName: (state, { currentNetwork }) => currentNetwork.name,
    remoteConnectionsSubtitle: ({ mobile }) => {
      const c = Object.entries(mobile.followers).filter(([, f]) => f.connected).length;
      return `${c} device${c === 1 ? '' : 's'} connected`;
    },
    appsAccountAccessSubtitle: ({ apps }) => {
      const c = apps.filter(app => get(app, 'permissions.accessToAccounts.length', 0)).length;
      return `${c} aepp${c === 1 ? '' : 's'} have account access`;
    },
    mnemonic: ({ accounts: { hdWallet: { mnemonic } } }) => mnemonic,
    removableAccounts: ({ accounts: { list } }) => list
      .map((account, idx) => ({ ...account, idx }))
      .filter(({ source: { type } }) => type !== 'hd-wallet'),
  }),
  methods: mapActions(['logout']),
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
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

  h2 {
    @extend %face-sans-s;
    margin-top: rem(30px);
    font-weight: 500;
  }

  .version {
    margin: rem(24px) 0;
    @extend %face-sans-s;
    color: $color-neutral-negative-1;
    text-align: center;
  }
}
</style>
