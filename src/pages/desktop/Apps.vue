<template>
  <div class="apps">
    <guide>æpps <em>browser</em> (beta)</guide>

    <note>
      æpps running working with the æternity blockchain will be visible here.
      We will implement a full æpp browser here soon. The æpps listed below are now only links.
    </note>

    <div class="shortcuts">
      <a
        href="https://explorer.aepps.com/"
        target="_blank"
      >
        <img src="../../assets/icons/aepps/blockchain-explorer.svg">
        Blockchain Explorer
      </a>
      <a
        href="http://token-migration.aepps.com/"
        target="_blank"
      >
        <img src="../../assets/icons/aepps/token-migration.svg">
        Token Migration
      </a>
    </div>
  </div>
</template>

<script>
import Guide from '../../components/Guide.vue';
import Note from '../../components/Note.vue';

export default {
  components: { Guide, Note },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.apps {
  .shortcuts {
    display: flex;

    a {
      display: block;
      text-align: center;
      text-decoration: none;
      @extend %face-sans-s;
      font-weight: 500;
      color: $color-neutral-negative-3;
      width: 80px;
      margin-right: 95px;

      img {
        width: rem(75px);
        height: rem(75px);
        border-radius: rem(18px);
        box-shadow: 0 0 16px rgba(0, 33, 87, 0.15);
        margin-bottom: 5px;
      }
    }
  }
}
</style>
