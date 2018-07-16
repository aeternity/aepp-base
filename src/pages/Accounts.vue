<template>
  <transition name="slide">
    <mobile-page
      class="accounts"
      title="My Accounts"
      close-button
      @close="toggleIdManager">
      <label class="active-account">Active address</label>
      <ae-identity
        :identity="activeIdentity"
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

      <fixed-add-button @click="modalVisible = true" />

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
          size="smaller"
          type="exciting"
          uppercase
          @click="modalVisible = false"
        >
          cancel
        </ae-button>
        <ae-button
          slot="buttons"
          size="smaller"
          type="dramatic"
          uppercase
          @click="handleAddAddress"
        >
          add account
        </ae-button>
      </ae-modal-light>
    </mobile-page>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import {
  AeIdentity, AeIdentityAvatar, AeButton, AeDivider,
  AeLabel, AeInput, AeModalLight
} from '@aeternity/aepp-components'
import MobilePage from '../components/MobilePage'
import FixedAddButton from '../components/FixedAddButton'
import ListItem from '../components/ListItem'
import AeRadio from '../components/AeRadio.vue'
import { roundToken } from '../lib/filters'

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
    AeRadio
  },
  filters: { roundToken },
  data: () => ({
    modalVisible: false,
    newAccountName: ''
  }),
  computed: {
    ...mapGetters(['totalBalance', 'activeIdentity', 'identities']),
    ...mapState(['selectedIdentityIdx'])
  },
  mounted () {
    this.$store.dispatch('updateAllBalances')
  },
  methods: {
    ...mapMutations(['selectIdentity', 'toggleIdManager', 'createIdentity']),
    handleAddAddress () {
      this.createIdentity(this.newAccountName)
      this.newAccountName = ''
      this.modalVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.accounts {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, white, #f1f4f7);

  &.slide {
    &-enter-active, &-leave-active {
      transition: top 500ms, opacity 500ms;
    }
    &-enter, &-leave-to {
      top: 100%;
      opacity: 0;
    }
  }

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
