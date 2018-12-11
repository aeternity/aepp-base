<template>
  <div class="quick-id">
    <router-link :to="{ name: 'transfer' }">
      <ae-icon name="transfer" />
      Transfer
    </router-link>
    <button
      :class="showAccountSwitcher ? 'router-link-active' : ''"
      @click="() => !showAccountSwitcher && toggleAndUpdateAccountSwitcher()"
    >
      <ae-identity-avatar :address="activeIdentity.address" />
    </button>
    <router-link :to="{ name: 'settings' }">
      <ae-icon name="settings" />
      Settings
    </router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { AeIdentityAvatar } from '@aeternity/aepp-components';
import { AeIcon } from '@aeternity/aepp-components-3';

export default {
  components: { AeIdentityAvatar, AeIcon },
  computed: {
    ...mapGetters(['activeIdentity']),
    ...mapState({
      showAccountSwitcher: ({ mobile }) => mobile.showAccountSwitcher,
    }),
  },
  methods: {
    ...mapMutations(['toggleAccountSwitcher']),
    toggleAndUpdateAccountSwitcher() {
      this.toggleAccountSwitcher();
      this.$store.dispatch('updateAllBalances');
    },
  },
};
</script>

<style scoped lang="scss">
.quick-id {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  background-color: #001833;

  a, button {
    flex-grow: 1;
    flex-basis: 0;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.45;
    letter-spacing: 0.2px;
    color: #76818c;
    text-decoration: none;
    text-align: center;

    .ae-icon {
      font-size: 20px;
      display: block;
      margin-bottom: 4px;
    }

    .ae-identity-avatar {
      width: 42px;
      height: 42px;
      border: 2px solid #000;
      box-shadow: 0 0 0 2px #ff0d6a;
    }

    &.router-link-active {
      color: #fff;

      .ae-identity-avatar {
        box-shadow: 0 0 0 2px #fff;
      }
    }
  }

  button {
    display: inline;
    background-color: transparent;
    border: none;
  }
}
</style>
