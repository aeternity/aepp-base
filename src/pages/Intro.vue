<template>
  <mobile-page class="intro">
    <guide fill="neutral">
      <em>Base æpp.</em>
      <br>Interact with the
      <br>æternity blockchain.
      <br>In a human way.
    </guide>

    <template slot="footer">
      <ae-button
        :to="{ name: keystore ? 'login' : 'recover' }"
        size="medium"
        fill="secondary"
      >
        {{ keystore ? 'Login' : 'Recover' }}
      </ae-button>
      <ae-button
        :to="{ name: 'new-account' }"
        size="medium"
        fill="neutral"
        plain
        uppercase
      >
        Create New Account
      </ae-button>
      <hr>
      <ae-button
        :to="{ name: 'onboarding' }"
        size="medium"
        fill="neutral"
        plain
        uppercase
      >
        See how it works
      </ae-button>
    </template>
  </mobile-page>
</template>

<script>
import { mapState } from 'vuex';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeButton from '../components/AeButton.vue';

export default {
  components: { MobilePage, AeButton, Guide },
  computed: mapState({
    keystore: state => state.mobile.keystore,
  }),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.intro.mobile-page {
  background: $color-primary;

  /deep/ .panel {
    .content {
      margin: 0 rem(48px);
    }

    .footer {
      margin: 0 rem(32px);

      > .ae-button {
        margin: 0 auto;
      }

      hr {
        margin: 0 rem(20px);
        height: 2px;
        border: none;
        background-color: $color-primary-negative-1;
      }
    }
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
