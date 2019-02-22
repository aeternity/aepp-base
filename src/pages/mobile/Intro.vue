<template>
  <MobilePage
    class="intro"
    fill="primary"
  >
    <Guide fill="neutral">
      <em>Base æpp</em>
      <br>æternity blockchain
      <br>power in your hands.
    </Guide>

    <template slot="footer">
      <AeButton
        :to="{ name: keystore ? 'login' : 'recover' }"
        fill="secondary"
      >
        {{ keystore ? 'Login' : 'Recover' }}
      </AeButton>
      <AeButton
        :to="{ name: 'new-account' }"
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
