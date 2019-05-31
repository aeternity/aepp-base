<template>
  <MobilePage
    header-fill="alternative"
    class="settings-security-courses bank"
  >
    <template slot="header">
      <Guide fill="neutral">
        <em>You are the bank</em>
        <p>Security Course 2 of 4</p>
      </Guide>
    </template>

    <h2>Acting as your own bank</h2>
    <p>
      Means taking responsibility for your digital security:
    </p>

    <h2>Blockchain technology is decentralized by nature</h2>
    <p>
      Which means that the makers of Base æpp can not:
    </p>

    <ul>
      <li>
        Be robust and store your password and recovery passphrase offline safely.
      </li>
      <li>
        If you lose your password, it will truly be lost. The recovery passphrase is your backup.
      </li>
      <li>
        Stay sharp and alert. Do not share your password/recovery passphrase with anyone.
        Be aware of phishing websites and emails.
      </li>

      <li>
        Use a VPN (Virtual Private Network) like NordVPN when handling accounts and transactions.
        It encrypts all your internet traffic.
      </li>
    </ul>

    <h2>Blockchain technology is decentralized by nature</h2>
    <p>
      Which means that the makers of Base æpp can not:
    </p>

    <ul>
      <li>
        Access or freeze your account
      </li>
      <li>
        Recover or reset your password (this makes the recovery passphrase so important)
      </li>
      <li>
        Reverse, cancel, or refund transactions
      </li>
    </ul>
    <AeButton
      fill="alternative"
      @click="nextClickHandler('settings-security-courses-privacy')"
    >
      Go to course 3
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
      this.$store.commit('addCourse', 'settings-security-courses-bank');
      this.$router.push({ name });
    },
  },
};
</script>
<style lang="scss" src="./SecurityCourses.scss" scoped/>
<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.settings-security-courses.bank {
  li {
    padding-top: rem(20px);
  }

  /deep/ header.alternative {
    background-image: url('../../assets/security-courses/bank.svg');
    background-repeat: no-repeat;
    background-position: right;
  }
}
</style>
