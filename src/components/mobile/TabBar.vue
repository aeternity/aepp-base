<template>
  <div class="tab-bar">
    <div class="wrapper">
      <button-plain :to="browserPath || { name: 'apps' }">
        <ae-icon name="grid" />
        Browser
      </button-plain>

      <button-plain :to="{ name: 'transfer' }">
        <ae-icon name="transfer" />
        Transfer
      </button-plain>

      <button-plain
        :class="showAccountSwitcher ? 'router-link-active' : ''"
        @click="() => !showAccountSwitcher && toggleAccountSwitcher()"
      >
        <ae-identity-avatar :address="activeIdentity.address" />
      </button-plain>

      <button-plain :to="{ name: 'address-book' }">
        <ae-icon name="contacts" />
        Contacts
      </button-plain>

      <button-plain :to="{ name: 'settings' }">
        <ae-icon name="settings" />
        Settings
      </button-plain>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { AeIdentityAvatar } from '@aeternity/aepp-components';
import { AeIcon } from '@aeternity/aepp-components-3';
import ButtonPlain from '../ButtonPlain.vue';

export default {
  components: { AeIdentityAvatar, AeIcon, ButtonPlain },
  computed: {
    ...mapGetters(['activeIdentity']),
    ...mapState({
      showAccountSwitcher: ({ mobile }) => mobile.showAccountSwitcher,
      browserPath: ({ mobile }) => mobile.browserPath,
    }),
  },
  methods: mapMutations(['toggleAccountSwitcher']),
};
</script>

<style scoped lang="scss">
@import '~@aeternity/aepp-components-3/src/styles/variables/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/fallback/variables.scss';

.tab-bar {
  position: sticky;
  bottom: 0;
  background-color: $color-neutral-minimum;

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

      .ae-icon {
        font-size: 20px;
        display: block;
        margin-bottom: 4px;
      }

      .ae-identity-avatar {
        width: 42px;
        height: 42px;
        border: 2px solid #000;
        box-shadow: 0 0 0 2px $color-primary;
      }

      &.router-link-active {
        color: #fff;

        .ae-identity-avatar {
          box-shadow: 0 0 0 2px #fff;
        }
      }
    }
  }
}
</style>
