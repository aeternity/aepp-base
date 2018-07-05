<template>
  <transition name="slide">
    <mobile-page
      class="accounts"
      title="My Accounts"
      close-button
      @close="toggleIdManager">
      <template v-if="inactiveIdentities.length">
        <label class="total-balance">
          Total balance
          <span>
            <span class="ae">{{ totalBalance | roundToken }} AE</span>
          </span>
        </label>
        <ae-divider />
      </template>

      <label>Active address</label>
      <ae-identity
        :identity="activeIdentity"
        class="active-account"
        active
      />

      <template v-if="inactiveIdentities.length === 0">
        <p>
          This is your first account, it enables you to use our æpps,
          get Tokens, trade them and much more!
        </p>
        <p>
          Quickly activate another account or instantly create one or multiple accounts.
          Each has it’s own address and Token Balance
        </p>
      </template>
      <template v-else>
        <ae-divider/>
        <label>
          Inactive
          <span>{{ inactiveIdentities.length }}</span>
        </label>
        <div class="inactive-accounts">
          <ae-identity
            v-for="{ identity, index, beforeActive, active } in inactiveIdentities"
            :key="identity.address"
            :identity="identity"
            :class="{ 'before-active': beforeActive, active }"
            collapsed
            @click="activateCard(index)"
          >
            <div
              v-if="active"
              class="action-buttons">
              <ae-divider />
              <ae-button
                size="small"
                type="dramatic"
                uppercase
                @click="selectIdentity(index)"
              >
                Activate
              </ae-button>
            </div>
          </ae-identity>
        </div>
      </template>

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
  AeIdentity, AeButton, AeDivider,
  AeLabel, AeInput, AeModalLight
} from '@aeternity/aepp-components'
import MobilePage from '../components/MobilePage'
import FixedAddButton from '../components/FixedAddButton'
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
    AeModalLight
  },
  filters: { roundToken },
  data: () => ({
    activeIdentityCard: -1,
    modalVisible: false,
    newAccountName: ''
  }),
  computed: {
    ...mapGetters(['totalBalance', 'activeIdentity']),
    ...mapState({
      inactiveIdentities (state, { identities, activeIdentity }) {
        const activeIndex = this.activeIdentityCard
        return identities
          .map((identity, index) => ({ identity, index }))
          .filter(({ identity }) => identity !== activeIdentity)
          .map(({ identity, index }, i, identities) => ({
            identity,
            index,
            beforeActive: identities[i + 1] && identities[i + 1].index === activeIndex,
            active: index === activeIndex
          }))
      }
    })
  },
  mounted () {
    this.$store.dispatch('updateAllBalances')
  },
  methods: {
    ...mapMutations(['selectIdentity', 'toggleIdManager', 'createIdentity']),
    activateCard (i) {
      this.activeIdentityCard = i === this.activeIdentityCard ? -1 : i
    },
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

    &.total-balance {
      font-size: 16px;
      text-transform: capitalize;

      span {
        font-family: 'Roboto Mono', monospace;
        font-size: 12px;
        color: $black;

        .ae {
          font-weight: bold;
        }
      }
    }
  }

  p {
    margin-left: auto;
    margin-right: auto;
    max-width: 400px;
    text-align: center;
  }

  .active-account {
    margin-bottom: 22px;
  }

  .inactive-accounts {
    & > *:not(:last-child):not(.before-active):not(.active) {
      padding-bottom: 35px;
      margin-bottom: -24px;
    }

    .active {
      margin: 10px 0;
    }
  }

  .ae-identity {
    .action-buttons {
      text-align: right;

      .ae-divider {
        margin-bottom: 15px;
      }
    }
  }

  .ae-overlay /deep/ .ae-modal-light main {
    text-align: start;
  }
}
</style>
