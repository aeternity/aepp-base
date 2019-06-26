<template>
  <MobilePage
    class="intro"
    fill="primary"
    hide-tab-bar
  >
    <Guide fill="neutral">
      <em>Base æpp</em>
      <br>æternity blockchain
      <br>power in your hands.
    </Guide>

    <template slot="footer">
      <AeButton
        :to="{ name: encryptedWallet ? 'login' : 'recover' }"
        fill="secondary"
      >
        {{ encryptedWallet ? 'Login' : 'Recover' }}
      </AeButton>
      <AeButton
        :to="{ name: 'set-password' }"
        fill="light"
        plain
      >
        Create New Account
      </AeButton>
      <hr>
      <AeButton
        :to="{ name: 'onboarding' }"
        fill="light"
        plain
      >
        See how it works
      </AeButton>
    </template>
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: { MobilePage, AeButton, Guide },
  computed: mapState('accounts/hdWallet', ['encryptedWallet']),
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';
@import '../../styles/variables/colors.scss';

.intro.mobile-page {
  padding-bottom: env(safe-area-inset-bottom);

  hr {
    margin: 0 rem(-16px);
    height: 2px;
    border: none;
    background-color: $color-primary-negative-1;
  }

  .ae-button.medium.plain:last-child {
    margin-bottom: 0;
  }
}
</style>
