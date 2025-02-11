<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template>
  <SettingsSecurityCourseWrapper name="bank">
    <template v-if="$i18n.locale === 'cn'">
      <h2>作为您自己的银行</h2>
      <p>意味着您需要对您自己的资产安全负责；</p>

      <ul class="long-items">
        <li>请<strong>安全离线存储</strong>您的密码和助记词。</li>
        <li>如果您丢失您的密码，那就完全丢失。助记词是您的备份。</li>
        <li>
          请随时保持警惕，不要将您的密码或助记词分享给任何人。 请在浏览网站或者邮件时确保谨慎。
        </li>

        <li>建议在您处理账户和转账时，使用VPN如NordVPN，这能加密您的网络连接。</li>
      </ul>

      <h2>区块链技术天然具有去中心化</h2>
      <p>这意味着Base æpp不能：</p>

      <ul class="long-items">
        <li>访问或者锁定您的账户</li>
        <li>恢复或者重置您的密码（这意味着助记词的重要性）</li>
        <li>修改、取消或者重复支付您的转账</li>
      </ul>
    </template>
    <template v-else-if="$i18n.locale === 'ru'">
      <h2>Выступать в качестве собственного банка</h2>
      <p>Означает брать на себя ответственность за вашу цифровую безопасность:</p>

      <ul class="long-items">
        <li>
          Будьте умны и <strong> храните </strong> свой пароль и мнемоническую фразу
          <strong> оффлайн в безопасности </strong>.
        </li>
        <li>
          Если вы потеряете свой пароль, он действительно будет потерян. Мнемоническая фраза - это
          ваша резервная копия.
        </li>
        <li>
          Будьте проницательны и бдительны. Не сообщайте никому свой пароль/мнемоническую фразу.
          Будьте в курсе фишинговых сайтов и электронных писем.
        </li>

        <li>
          Используйте VPN (виртуальную частную сеть), такую как NordVPN, при обработке учетных
          записей и транзакций. Он шифрует весь ваш интернет-трафик.
        </li>
      </ul>

      <h2>Технология Blockchain по своей природе децентрализована</h2>
      <p>Это означает, что создатели Base æpp не могут:</p>

      <ul class="long-items">
        <li>Иметь доступ или замораживать ваш аккаунт</li>
        <li>
          Восстанавливать или сбрасывать ваш пароль (это делает мнемоническую фразу очень важной)
        </li>
        <li>Изменять, отменять или возвращать транзакции</li>
      </ul>
    </template>
    <template v-else>
      <h2>Acting as your own bank</h2>
      <p>Means taking responsibility for your digital security:</p>

      <ul class="long-items">
        <li>
          Be smart and <strong>store</strong> your password and recovery passphrase
          <strong>offline safely</strong>.
        </li>
        <li>
          If you lose your password, it will truly be lost. The recovery passphrase is your backup.
        </li>
        <li>
          Stay sharp and alert. Do not share your password/recovery passphrase with anyone. Be aware
          of phishing websites and emails.
        </li>

        <li>
          Use a VPN (Virtual Private Network) like NordVPN when handling accounts and transactions.
          It encrypts all your internet traffic.
        </li>
      </ul>

      <h2>Blockchain technology is decentralized by nature</h2>
      <p>Which means that the makers of Base æpp can not:</p>

      <ul class="long-items">
        <li>Access or freeze your account</li>
        <li>Recover or reset your password (this makes the recovery passphrase so important)</li>
        <li>Reverse, cancel, or refund transactions</li>
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
.settings-security-course-details.bank {
  --title-image: url('../../assets/security-courses/bank.svg') bottom right / auto 90%;
}
</style>
