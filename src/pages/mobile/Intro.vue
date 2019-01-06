<template>
  <mobile-page
    class="intro"
    fill="primary"
  >
    <guide fill="neutral">
      <em>Base æpp.</em>
      <br>Interact with the
      <br>æternity blockchain.
      <br>In a human way.
    </guide>

    <template slot="footer">
      <ae-button
        :to="{ name: keystore ? 'login' : 'recover' }"
        fill="secondary"
      >
        {{ keystore ? 'Login' : 'Recover' }}
      </ae-button>
      <ae-button
        :to="{ name: 'new-account' }"
        fill="light"
        plain
      >
        Create New Account
      </ae-button>
      <hr>
      <ae-button
        :to="{ name: 'onboarding' }"
        fill="light"
        plain
      >
        See how it works
      </ae-button>
    </template>
  </mobile-page>
</template>

<script>
import { mapState } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: { MobilePage, AeButton, Guide },
  computed: mapState({
    keystore: state => state.mobile.keystore,
  }),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.intro.mobile-page {
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
