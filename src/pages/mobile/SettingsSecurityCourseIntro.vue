<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template>
  <SettingsSecurityCourseWrapper name="intro">
    <template v-if="$i18n.locale === 'cn'">
      <h2>欢迎来到Base aepp</h2>
      <p>很高兴遇见您，</p>
      <h2>在您开始之前</h2>
      <p>让我们从一些值得关注的事情入手，</p>

      <h2>Base æpp仅仅只是</h2>
      <p>一个可以连接、创建和保留æternity链上信息的app。</p>

      <h2>Base æpp并不”拥有“您的AE</h2>
      <p>Base æpp展示您的tokens。您自己拥有安全存储、发送和接收资金的所有权。</p>

      <h2 class="important">这就意味着您自己本身就是您的银行！</h2>

      <h2>我们并不想吓跑您</h2>
      <p>在您遵守以下几条安全事项后，您就能完全放心。</p>

      <h2>免责声明</h2>
      <p>
        该软件由æternity“原样”提供，没有任何形式的担保、 明示或暗示，包括但不限于适销性保证，
        适合特定目的和不侵犯。 在任何情况下，作者均不对任何索赔、损害赔偿或其他责任承担责任，
        无论是在合约、侵权或其他方面的行为， 与软件或软件中的使用或其他交易有关或与之相关。
      </p>
    </template>
    <template v-else-if="$i18n.locale === 'ru'">
      <h2>Добро пожаловать в Base aepp</h2>
      <p>Здорово, что вы здесь.</p>
      <h2>Прежде чем вы начнете</h2>
      <p>Давайте начнем с нескольких вещей, о которых вам нужно знать.</p>

      <h2>Base æpp - это не что иное</h2>
      <p>
        как приложение, которое может получать, создавать и сохранять информацию в блокчейне
        æternity.
      </p>

      <h2>У Base æpp нет ваших AE</h2>
      <p>
        Base æpp отображает ваши токены. Вы отвечаете за безопасное хранение, отправку и получение
        ваших средств.
      </p>

      <h2 class="important">Это означает, что вы - ваш собственный банк!</h2>

      <h2>Мы не пытаемся вас отпугнуть</h2>
      <p>Всё будет в порядке, если вы будете придерживаться определенных мер безопасности.</p>

      <h2>Письменный отказ от ответственности</h2>
      <p>
        Программное обеспечение предоставляется компанией «как есть», без каких-либо гарантий, явных
        или подразумеваемых, включая, помимо прочего, гарантии товарной пригодности, пригодности для
        конкретной цели и отсутствия нарушений. Ни в коем случае авторы не несут ответственности за
        какие-либо претензии, ущерб или другую ответственность, будь то в результате действия
        договора, гражданского правонарушения или иным образом, возникающих в связи с программным
        обеспечением, в связи с ним или в связи с его использованием или другими действиями в
        программном обеспечении.
      </p>
    </template>
    <template v-else>
      <h2>Welcome in Base aepp</h2>
      <p>It’s great to have you here.</p>
      <h2>Before you start</h2>
      <p>Let's start with a few things you need to be aware of.</p>

      <h2>The Base æpp is nothing more</h2>
      <p>than an app that can access, create and save information on the æternity blockchain.</p>

      <h2>The Base æpp does not ‘have’ your AE</h2>
      <p>
        The Base æpp displays your tokens. You are in charge of the safe storage, sending and
        receiving of your funds.
      </p>

      <h2 class="important">This means that you are your own bank!</h2>

      <h2>We are not trying to scare you away</h2>
      <p>You will be perfectly fine when you follow certain security measures.</p>

      <h2>Disclaimer</h2>
      <p>
        The software is provided by æternity "as is", without warranty of any kind, express or
        implied, including but not limited to the warranties of merchantability, fitness for a
        particular purpose and noninfringement. In no event shall the authors be liable for any
        claim, damages or other liability, whether in an action of contract, tort or otherwise,
        arising from, out of or in connection with the software or the use or other dealings in the
        software.
      </p>
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
.settings-security-course-details.intro {
  --title-image: url('../../assets/security-courses/warning.svg') top left / auto 97%;
}
</style>
