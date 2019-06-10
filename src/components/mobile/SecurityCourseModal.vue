<template>
  <Modal class="security-course-modal">
    <img src="../../assets/account-card.svg">
    <Guide>
      <em>Congratulations!</em> You created an account
    </Guide>
    <div class="note">
      Please take 2 minutes to learn about the importance of security
    </div>
    <div class="buttons">
      <AeButton
        fill="alternative"
        @click="openSecurityCourse"
      >
        Start security course 1
      </AeButton>
      <AeButton
        plain
        @click="resolve"
      >
        I'll do it later
      </AeButton>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';
import Guide from '../Guide.vue';
import AeButton from '../AeButton.vue';

export default {
  components: { Modal, Guide, AeButton },
  props: {
    resolve: { type: Function, required: true },
  },
  methods: {
    openSecurityCourse() {
      this.resolve();
      this.$router.push({ name: 'settings-security-course-intro', params: { firstEnter: true } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.security-course-modal {
  text-align: center;

  /deep/ .modal-plain {
    max-width: rem(275px);
    padding: rem(50px) rem(30px) rem(10px) rem(30px);
  }

  .guide {
    margin-bottom: rem(5px);
  }

  .note {
    @extend %face-sans-base;
    color: $color-neutral-negative-3;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    margin-top: rem(20px);

    .ae-button {
      min-width: 0;
    }
  }
}
</style>
