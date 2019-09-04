<template>
  <SettingsSecurityCourseWrapper name="layers">
    <template v-if="$i18n.locale === 'cn'">
      <h2>强烈建议添加安全层</h2>
      <p>
        当然，当你处理的不仅仅是午餐钱的时候。
      </p>

      <h2>Base æpp用于小额支付</h2>
      <p>
        它是安全的，但不适用于大额交易或存储。
      </p>

      <h2>建议使用Vault-like security </h2>
      <p>
        来自AirGap（与Base æpp完全整合）或者使用硬件钱包。
      </p>
    </template>
    <template v-else-if="$i18n.locale === 'ru'">
      <h2>Добавление уровней безопасности настоятельно рекомендуется</h2>
      <p>
        Конечно, когда вы держите больше денег чем на обед.
      </p>

      <h2>Base æpp создан для небольших транзакций</h2>
      <p>
        Это безопасно, но не предназначено для транзакций большого объема или хранения.
      </p>

      <h2>Безопасность по типу сейфа</h2>
      <p>
        Можно достичь с AirGap (интегрированным с Base æpp) или
        аппаратным криптовалютным кошельком.
      </p>
    </template>
    <template v-else>
      <h2>Adding security layers is highly recommended</h2>
      <p>
        Certainly when you are handling more than lunch money.
      </p>

      <h2>The Base æpp is built for small transactions </h2>
      <p>
        It is safe but not meant for high volume transactions or storage.
      </p>

      <h2>Vault-like security </h2>
      <p>
        Comes from AirGap (integrated with Base æpp) or a hardware crypto wallet.
      </p>
    </template>

    <AeButton
      fill="alternative"
      :to="{ name: 'vault-setup-method' }"
    >
      {{ $t('security-courses.settings.details.layers.setup') }}
    </AeButton>
    <AeButton
      to="https://www.ledger.com"
      fill="dark"
    >
      {{ $t('security-courses.settings.details.layers.buy') }}
    </AeButton>
  </SettingsSecurityCourseWrapper>
</template>

<script>
import SettingsSecurityCourseWrapper from './SettingsSecurityCourseWrapper.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    SettingsSecurityCourseWrapper,
    AeButton,
  },
};
</script>

<style lang="scss" scoped>
.settings-security-course-details.layers {
  --title-image: url('../../assets/security-courses/layers.svg') center right / auto 85%;
}
</style>
