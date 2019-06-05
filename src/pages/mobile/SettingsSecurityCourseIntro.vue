<template>
  <SettingsSecurityCourseWrapper name="intro">
    <h2>Welcome in Base aepp</h2>
    <p>
      It’s great to have you here.
    </p>
    <h2>Before you start</h2>
    <p>
      Let's start with a few things you need to be aware of.
    </p>

    <h2>The Base æpp is nothing more</h2>
    <p>than an app that can access, create and save information on the æternity blockchain.</p>

    <h2>The Base æpp does not ‘have’ your AE</h2>
    <p>
      The Base æpp displays your tokens. You are in charge of the safe storage,
      sending and receiving of your funds.
    </p>

    <h2 class="important">
      This means that you are your own bank!
    </h2>

    <h2>We are not trying to scare you away</h2>
    <p>You will be perfectly fine when you follow certain security measures.</p>

    <h2>Disclaimer</h2>
    <p>
      The software is provided by æternity "as is", without warranty of any kind,
      express or implied, including but not limited to the warranties of merchantability,
      fitness for a particular purpose and noninfringement.
      In no event shall the authors be liable for any claim, damages or other liability,
      whether in an action of contract, tort or otherwise, arising from,
      out of or in connection with the software or the use or other dealings in the software.
    </p>
  </SettingsSecurityCourseWrapper>
</template>

<script>
import SettingsSecurityCourseWrapper from './SettingsSecurityCourseWrapper.vue';

export default {
  components: { SettingsSecurityCourseWrapper },
};
</script>

<style lang="scss" scoped>
.settings-security-course-details.intro {
  --title-image: url('../../assets/security-courses/warning.svg') top left / auto 97%;
}
</style>
