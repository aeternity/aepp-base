<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'accounts' }"
    class="accounts-new"
    close-button
  >
    <guide
      fill="neutral"
    >
      <em>Create new account</em>
      <br>choose  a name
      <br>for your new account
    </guide>

    <template slot="content-bottom">
      <ae-input
        :id="_uid.toString()"
        v-model="newAccountName"
        label="Name"
        placeholder="Name"
      />
      <ae-button
        slot="buttons"
        size="medium"
        fill="secondary"
        uppercase
        @click="handleAddAddress"
      >
        Create
      </ae-button>
    </template>
  </mobile-page>
</template>

<script>
import { mapMutations } from 'vuex';
import AeInput from '../components/AeInput.vue';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeButton from '../components/AeButton.vue';

export default {
  components: {
    AeButton,
    MobilePage,
    AeInput,
    Guide,
  },
  data: () => ({
    newAccountName: '',
  }),
  methods: {
    ...mapMutations(['createIdentity']),
    handleAddAddress() {
      this.createIdentity(this.newAccountName);
      this.newAccountName = '';
      this.$router.push({ name: 'accounts' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';
@import '../components/MobilePage.scss';

.accounts-new {
  /deep/ .header-mobile {
    margin-bottom: 0;

    .icon {
      color: white;
    }
  }

  /deep/ .top {
    position: relative;
    margin-bottom: rem(30px);
    background: $color-primary;
  }

  /deep/ .bottom {
    background: $color-neutral-maximum;
    margin-top: rem(-60px) !important;

    .content {
      .ae-input {
        margin: 0;
      }

      .ae-button {
         margin: rem(20px) auto;
      }
    }
  }

  .guide {
    margin: 0 0 rem(50px) rem(20px);
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
