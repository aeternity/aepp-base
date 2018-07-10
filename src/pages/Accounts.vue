<template>
  <transition name="slide">
    <mobile-page
      class="accounts"
      title="My Accounts"
      close-button
      @close="toggleIdManager">

      <label>Active address</label>
      <ae-identity
        :identity="activeIdentity"
        class="active-account"
        active
      />

      <account-switcher />

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
import { mapGetters, mapMutations } from 'vuex'
import {
  AeIdentity, AeButton, AeDivider,
  AeLabel, AeInput, AeModalLight
} from '@aeternity/aepp-components'
import MobilePage from '../components/MobilePage'
import FixedAddButton from '../components/FixedAddButton'
import AccountSwitcher from '../components/AccountSwitcher'
import { roundToken } from '../lib/filters'

export default {
  components: {
    AeIdentity,
    AeButton,
    AeDivider,
    MobilePage,
    FixedAddButton,
    AeLabel,
    AeInput,
    AeModalLight,
    AccountSwitcher
  },
  filters: { roundToken },
  data: () => ({
    modalVisible: false,
    newAccountName: ''
  }),
  computed: mapGetters(['activeIdentity']),
  mounted () {
    this.$store.dispatch('updateAllBalances')
  },
  methods: {
    ...mapMutations(['toggleIdManager', 'createIdentity']),
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

  label {
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

  .ae-overlay /deep/ .ae-modal-light main {
    text-align: start;
  }
}
</style>
