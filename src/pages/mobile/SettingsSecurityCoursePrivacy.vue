<template>
  <SettingsSecurityCourseWrapper name="privacy">
    <template v-if="$i18n.locale === 'cn'">
      <h2>æternity高度重视隐私</h2>
      <p>
        Base æpp不会询问、接收、发送或者存储您的：
      </p>

      <ul>
        <li>姓名</li>
        <li>生日</li>
        <li>家庭地址</li>
        <li>邮箱地址</li>
        <li>电话号码</li>
        <li>社交账号</li>
        <li>IP地址</li>
      </ul>
    </template>
    <template v-else-if="$i18n.locale === 'ru'">
      <h2>æternity ценит конфиденциальность</h2>

      <p>
        Base æpp не будет запрашивать, получать, передавать или хранить ваши:
      </p>

      <ul>
        <li>ФИО</li>
        <li>Дата рождения</li>
        <li>Домашний адрес</li>
        <li>Email адрес</li>
        <li>Телефонный номер</li>
        <li>Аккаунты в социальных сетях</li>
        <li>IP адрес</li>
      </ul>
    </template>
    <template v-else>
      <h2>æternity values privacy</h2>

      <p>
        The Base æpp will not ask, receive, transmit or store your:
      </p>

      <ul>
        <li>First and last name</li>
        <li>Date of birth</li>
        <li>Home address</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Social media accounts</li>
        <li>IP address</li>
      </ul>
    </template>
  </SettingsSecurityCourseWrapper>
</template>

<script>
import SettingsSecurityCourseWrapper from './SettingsSecurityCourseWrapper.vue';

export default {
  components: { SettingsSecurityCourseWrapper },
};
</script>

<style lang="scss" scoped>
.settings-security-course-details.privacy {
  --title-image: url('../../assets/security-courses/eye.svg') center left / auto 85%;
}
</style>
