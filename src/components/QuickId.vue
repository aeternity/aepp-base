<template>
  <div class="quick-id">
    <router-link :to="{ name: 'apps' }">Browser</router-link>
    <router-link :to="{ name: 'transfer' }">Wallet</router-link>
    <router-link :to="{ name: 'accounts' }">
      <ae-identity-avatar :address="identity.address" />
    </router-link>
    <router-link :to="{ name: 'address-book' }">Contacts</router-link>
    <router-link :to="{ name: 'settings' }">Settings</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { AeIdentityAvatar } from '@aeternity/aepp-components';

export default {
  components: { AeIdentityAvatar },
  computed: mapGetters({
    identity: 'activeIdentity',
  }),
};
</script>

<style scoped lang="scss">
.quick-id {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  background-color: #001833;

  a {
    font-size: 11px;
    font-weight: 500;
    line-height: 1.45;
    letter-spacing: 0.2px;
    color: #76818c;
    text-decoration: none;

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
}
</style>
