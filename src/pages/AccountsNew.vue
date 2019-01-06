<template>
  <mobile-page
    class="accounts-new"
    fill="primary"
    close-button
    @close="$router.back()"
  >
    <guide fill="neutral">
      <em>Create new subaccount</em>
      <br>and name it
    </guide>

    <form
      slot="content-bottom"
      @submit.prevent="handleAddAddress"
    >
      <ae-input
        v-model="newAccountName"
        v-validate="'required'"
        autofocus
        :error="errors.has('newAccountName')"
        :footer="errors.first('newAccountName')"
        name="newAccountName"
        header="Name"
        placeholder="Name"
      />
      <ae-button fill="secondary">
        Create
      </ae-button>
    </form>
  </mobile-page>
</template>

<script>
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
    async handleAddAddress() {
      if (!await this.$validator.validateAll()) return;
      this.$store.commit('createIdentity', this.newAccountName);
      this.$store.commit('selectIdentity', this.$store.state.mobile.accountCount - 1);
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.accounts-new {
  /deep/ {
    .top {
      position: relative;
      margin-bottom: rem(30px);
    }

    .panel .bottom {
      margin-top: rem(-60px);
    }
  }

  .guide {
    margin: 0 0 rem(50px) rem(20px);
  }

  .ae-button {
    margin: rem(20px) auto;
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
