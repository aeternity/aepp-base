<template>
  <MobilePage
    header-fill="alternative"
    class="settings-security-courses intro"
  >
    <template slot="header">
      <Guide fill="neutral">
        <em>Intro & Disclaimer</em>
        <p>Security Course 1 of 4</p>
      </Guide>
    </template>

    <h2>Before you start</h2>
    <p>
      It’s great to have you here. Let's start with a few things you need to be aware of.
      It has to do with the high level of individual responsibility in blockchain services.
    </p>

    <h2>Base æpp is nothing more</h2>
    <p>than an app that can access, create and save information on the æternity blockchain.</p>

    <h2>Base æpp does not ‘have’ your AE</h2>
    <p>
      Base æpp displays it. You are in charge of safe storage,
      sending and receiving of your funds.
    </p>

    <h1>It means that you are your own bank</h1>

    <h2>Not trying to scare you away</h2>
    <p>You will be perfectly fine when you respect certain security measures.</p>

    <h2>Disclaimer</h2>
    <p>
      The software is provided by æternity "as is", without warranty of any kind,
      express or implied, including but not limited to the warranties of merchantability,
      fitness for a particular purpose and noninfringement.
      In no event shall the authors be liable for any claim, damages or other liability,
      whether in an action of contract, tort or otherwise, arising from,
      out of or in connection with the software or the use or other dealings in the software.
    </p>
    <AeButton
      fill="alternative"
      @click="nextClickHandler"
    >
      Go to course 2
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
    nextClickHandler() {
      this.$store.commit('addCourse', 'settings-security-courses-intro');
      this.$router.push({ name: 'settings-security-courses-bank' });
    },
  },
};
</script>
<style lang="scss" src="./SecurityCourses.scss" scoped />
<style lang="scss" scoped>
.settings-security-courses.intro /deep/ header.alternative {
  background-image: url('../../assets/security-courses/warning.svg');
  background-repeat: no-repeat;
}
</style>
