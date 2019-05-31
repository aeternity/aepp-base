<template>
  <MobilePage
    header-fill="alternative"
    class="settings-security-courses layers"
  >
    <template slot="header">
      <Guide fill="neutral">
        <em>Security layers</em>
        <p>Security Course 4 of 4</p>
      </Guide>
    </template>

    <h2>Adding security layers is highly recommended</h2>
    <p>
      Certainly when you are handling more than lunch money.
    </p>

    <h2>Base æpp is built for small transactions </h2>
    <p>
      It is safe but not meant for high volume transactions or storage.
    </p>

    <h2>Vault-like security </h2>
    <p>
      Comes from AirGap (integrated with Base æpp) or a hardware crypto wallet.
    </p>
    <AeButton
      fill="alternative"
      @click="nextClickHandler('vault-setup-method')"
    >
      Setup airgap
    </AeButton>
    <AeButton
      to="https://www.ledger.com"
      fill="dark"
    >
      Buy a Ledger wallet
    </AeButton>
    <AeButton
      plain
      @click="nextClickHandler('settings-security-courses')"
    >
      To course overview
    </AeButton>
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeButton,
  },
  methods: {
    nextClickHandler(name) {
      this.$store.commit('addCourse', 'settings-security-courses-layers');
      this.$router.push({ name });
    },
  },
};
</script>
<style lang="scss" src="./SecurityCourses.scss" scoped/>
<style lang="scss" scoped>
.settings-security-courses.layers {
  /deep/ header.alternative {
    background-image: url('../../assets/security-courses/layers.svg');
    background-repeat: no-repeat;
    background-position: right;
  }
}
</style>
