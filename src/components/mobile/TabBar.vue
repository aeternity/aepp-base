<template>
  <div class="tab-bar">
    <div class="wrapper">
      <ButtonPlain :to="browserPath || { name: 'apps' }">
        <AeIcon name="grid" />
        æpps
      </ButtonPlain>

      <ButtonPlain :to="{ name: 'transfer' }">
        <AeIcon name="transfer" />
        Transfer
      </ButtonPlain>

      <ButtonPlain
        :class="showAccountSwitcher ? 'router-link-active' : ''"
        @click="() => !showAccountSwitcher && toggleAccountSwitcher()"
      >
        <AeIdenticon :address="activeIdentity.address" />
      </ButtonPlain>

      <ButtonPlain :to="{ name: 'address-book' }">
        <AeIcon name="contacts" />
        Contacts
      </ButtonPlain>

      <ButtonPlain :to="{ name: 'settings' }">
        <AeIcon name="settings" />
        Settings
      </ButtonPlain>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { AeIdenticon, AeIcon } from '@aeternity/aepp-components-3';
import ButtonPlain from '../ButtonPlain.vue';

export default {
  components: { AeIdenticon, AeIcon, ButtonPlain },
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
