<template>
  <mobile-page
    class="accounts"
    title="My Accounts"
  >
    <label class="active-account">Active address</label>
    <ae-identity
      v-bind="activeIdentity"
      class="active-account"
      active
    />

    <list-item>
      <div class="arrow">↪</div>
      <div class="content">
        <div class="title">Total Balance</div>
        <div class="subtitle">{{ totalBalance }} AE</div>
      </div>
    </list-item>

    <list-item
      v-for="(identity, index) in identities"
      :key="index">
      <ae-identity-avatar :address="identity.address" />
      <div class="content">
        <div class="title">{{ identity.name }}</div>
        <div class="subtitle">{{ identity.balance }} AE</div>
      </div>
      <ae-radio
        slot="right"
        :checked="index === selectedIdentityIdx"
        @change="selectIdentity(index)"
      />
    </list-item>

    <fixed-add-button
      quick-id
      @click="modalVisible = true"
    />

    <ae-modal-light
      v-if="modalVisible"
      title="Add New Account"
      @close="modalVisible = false"
    >
      <ae-label :for="_uid">Name Account</ae-label>
      <ae-input
        :id="_uid"
        v-model="newAccountName"
        placeholder="Placeholder" />
      <ae-button
        slot="buttons"
        size="small"
        type="exciting"
        plain
        uppercase
        @click="modalVisible = false"
      >
        cancel
      </ae-button>
      <ae-button
        slot="buttons"
        size="small"
        type="dramatic"
        plain
        uppercase
        @click="handleAddAddress"
      >
        add account
      </ae-button>
    </ae-modal-light>
  </mobile-page>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import {
  AeIdentity, AeIdentityAvatar, AeButton, AeDivider,
  AeLabel, AeInput, AeModalLight,
} from '@aeternity/aepp-components';
import MobilePage from '../components/MobilePage.vue';
import FixedAddButton from '../components/FixedAddButton.vue';
import ListItem from '../components/ListItem.vue';
import AeRadio from '../components/AeRadio.vue';
import { roundToken } from '../lib/filters';

export default {
  components: {
    AeIdentity,
    AeIdentityAvatar,
    AeButton,
    AeDivider,
    MobilePage,
    FixedAddButton,
    AeLabel,
    AeInput,
    AeModalLight,
    ListItem,
    AeRadio,
  },
  filters: { roundToken },
  data: () => ({
    modalVisible: false,
    newAccountName: '',
  }),
  computed: {
    ...mapGetters(['totalBalance', 'activeIdentity', 'identities']),
    ...mapState(['selectedIdentityIdx']),
  },
  mounted() {
    this.$store.dispatch('updateAllBalances');
  },
  methods: {
    ...mapMutations(['selectIdentity', 'toggleIdManager', 'createIdentity']),
    handleAddAddress() {
      this.createIdentity(this.newAccountName);
      this.newAccountName = '';
      this.modalVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.accounts {
  background: linear-gradient(to bottom, white, #f1f4f7);

  label.active-account {
    display: flex;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    color: $anthracite;
    margin: 15px 0;
    align-items: center;

    span {
      flex-grow: 1;
      text-align: right;
    }
  }

  .active-account {
    margin-bottom: 22px;
  }

  .list-item {
    .ae-identity-avatar, .arrow {
      border: none;
      width: 32px;
      height: 32px;
      text-align: center;
      line-height: 32px;
    }

    .content {
      margin-left: 8px;

      .title {
        font-size: 15px;
        font-weight: 500;
        color: #203040;
      }

      .subtitle {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 13px;
        color: #76818d;
      }
    }
  }

  .ae-overlay /deep/ .ae-modal-light main {
    text-align: start;
  }
}
</style>
