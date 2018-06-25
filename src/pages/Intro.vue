<template>
  <mobile-page class="intro">
    <div class="logo">
      <img :src="require('../assets/intro.svg')" />
      <p>
        æternity gives you easy access to the magic of blockchain
        technology. Instantly login or see how it works.
      </p>
    </div>

    <template slot="footer">
      <ae-button :to="{ name: 'new-account' }" type="exciting">
        Create Account
      </ae-button>
      <ae-button
        :to="{ name: keystore ? 'login' : 'recover' }"
        size="small"
        type="dramatic"
        plain
        uppercase
      >
        {{keystore ? 'Login' : 'Recover'}}
      </ae-button>
      <ae-button :to="{ name: 'onboarding' }" size="small" plain uppercase>
        See how it works
      </ae-button>
    </template>
  </mobile-page>
</template>

<script>
import { mapState } from 'vuex'
import { AeButton } from '@aeternity/aepp-components'
import MobilePage from '../components/MobilePage'

export default {
  components: { MobilePage, AeButton },
  computed: mapState({
    keystore: state => state.mobile.keystore
  })
}
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.intro.mobile-page {
  background: transparent;

  /deep/ .panel {
    background: transparent;

    .content {
      flex-shrink: 0;
      display: flex;
    }
  }

  .logo {
    text-align: center;
    margin: auto;

    img, p {
      margin: 12px;
    }

    p {
      max-width: 300px;
      font-size: 18px;
      line-height: 1.56;
      color: $anthracite;
    }
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
