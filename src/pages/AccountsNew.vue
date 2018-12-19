<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'transfer' }"
    class="accounts-new"
    fill="primary"
    close-button
  >
    <guide fill="neutral">
      <em>Create new subaccount</em>
      <br>and name it
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
    handleAddAddress() {
      this.$store.commit('createIdentity', this.newAccountName);
      this.$store.commit('selectIdentity', this.$store.state.mobile.accountCount - 1);
      this.$router.push({ name: 'transfer' });
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

      .content {
        .ae-input {
          margin: 0;
        }

        .ae-button {
           margin: rem(20px) auto;
        }
      }
    }
  }

  .guide {
    margin: 0 0 rem(50px) rem(20px);
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
