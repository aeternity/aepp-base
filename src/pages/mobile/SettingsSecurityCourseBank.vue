<template>
  <SettingsSecurityCourseWrapper name="bank">
    <h2>Acting as your own bank</h2>
    <p>
      Means taking responsibility for your digital security:
    </p>

    <ul class="long-items">
      <li>
        Be smart and <strong>store</strong> your password and
        recovery passphrase <strong>offline safely</strong>.
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

    <ul class="long-items">
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
  </SettingsSecurityCourseWrapper>
</template>

<script>
import SettingsSecurityCourseWrapper from './SettingsSecurityCourseWrapper.vue';

export default {
  components: { SettingsSecurityCourseWrapper },
};
</script>

<style lang="scss" scoped>
.settings-security-course-details.bank {
  --title-image: url('../../assets/security-courses/bank.svg') bottom right / auto 90%;
}
</style>
