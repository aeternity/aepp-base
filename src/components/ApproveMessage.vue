<template>
  <div class="approve-message">
    <dialog-header
      :app-name="appName"
      title="Requests to sign a message" />
    <div class="active-id-area">
      <div
        :title="`Active identity ${address}`"
        class="id">
        <ae-identity-avatar :address="address" />
        <div>{{ address }}</div>
      </div>
    </div>
    <p class="message">
      {{ message }}
    </p>
    <approve-buttons
      @approve="approve"
      @reject="close" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { AeIdentityAvatar } from '@aeternity/aepp-components';
import ApproveButtons from './ApproveButtons.vue';
import DialogHeader from './DialogHeader.vue';

export default {
  components: {
    AeIdentityAvatar,
    ApproveButtons,
    DialogHeader,
  },
  props: {
    appName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    resolve: {
      type: Function,
      required: true,
    },
    reject: {
      type: Function,
      required: true,
    },
  },
  computed: mapState({
    address: (state, { activeIdentity }) => activeIdentity.address,
  }),
  methods: {
    close() {
      this.reject(new Error('Signing rejected by user'));
      this.$store.commit('setMessageToApprove');
    },
    approve() {
      this.resolve();
      this.$store.commit('setMessageToApprove');
    },
  },
};
</script>

<style lang="scss" scoped>
.approve-message {
  background-image: linear-gradient(to bottom, white, #f1f4f7);
  padding: 30px 20px;
  border: solid 1px transparent;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  width: 300px;
  overflow-y: auto;
  max-height: calc(100% - 10px);

  .active-id-area{
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    .id, .id > *{
      max-width: 80px;
      text-overflow: ellipsis;
      overflow: hidden;
      font-family: 'Roboto Mono', monospace;
    }
  }

  .message {
    border: solid 2px #dcdcdc;
    border-radius: 10px;
    padding: 10px;
    text-align: left;
    max-height: 5em;
    overflow-y: auto;
    display: block;
  }
}
</style>
