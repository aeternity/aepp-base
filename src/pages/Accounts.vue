<template>
  <transition name="slide">
    <mobile-page class="accounts" title="My Accounts" @close="toggleIdManager" close-button>
      <template v-if="inactiveIdentities.length">
        <label class="total-balance">
          Total balance
          <span>
            <span class="ae">{{totalBalance | roundToken}} AE</span>
          </span>
        </label>
        <ae-divider />
      </template>

      <label>Active address</label>
      <ae-identity
        class="active-account"
        active
        :identity="activeIdentity"
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
          <span>{{inactiveIdentities.length}}</span>
        </label>
        <div class="inactive-accounts">
          <ae-identity
            v-for="{ identity, index, beforeActive, active } in inactiveIdentities"
            :key="identity.address"
            :identity="identity"
            collapsed
            :class="{ 'before-active': beforeActive, active }"
            @click="activateCard(index)"
          >
            <div v-if="active" class="action-buttons">
              <ae-divider />
              <ae-button
                @click="selectIdentity(index)"
                size="small"
                type="dramatic"
                uppercase
              >
                Activate
              </ae-button>
            </div>
          </ae-identity>
        </div>
      </template>


      <fixed-add-button @click="modalVisible = true" />
      <div>
            <ae-modal-light
              v-if="modalVisible"
              @close="modalVisible = false"
              title="Name Account"
            >
              <label>Name Account</label>
              <ae-input placeholder="Placeholder" v-model="addedName" />
              <ae-button
                size="smaller"
                type="exciting"
                uppercase
                @click="modalVisible = false"
                slot="buttons"
              >
                cancel
              </ae-button>
              <ae-button
                size="smaller"
                type="dramatic"
                uppercase
                @click="handleAddAddress"
                slot="buttons"
              >
                add account
              </ae-button>
            </ae-modal-light>
          </div>
    </mobile-page>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { AeIdentity, AeButton, AeDivider, AeInput, AeModalLight} from '@aeternity/aepp-components'
import MobilePage from '@/components/MobilePage'
import FixedAddButton from '@/components/FixedAddButton'
import { roundToken } from '@/lib/filters'

export default {
  data: () => ({
    activeIdentityCard: -1,
    modalVisible: false,
    addedName: '',
  }),
  components: { AeIdentity, AeButton, AeDivider, MobilePage, FixedAddButton, AeInput, AeModalLight },
  filters: { roundToken },
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
    }),
  },
  methods: {
    ...mapMutations(['selectIdentity', 'toggleIdManager', 'createIdentity', 'setName']),
    activateCard (i) {
      this.activeIdentityCard = i === this.activeIdentityCard ? -1 : i
    },
    handleAddAddress(){
      let accountCount=this.$store.state.mobile.accountCount
      let addedName = this.addedName
      this.createIdentity();
      this.setName({objIndex: accountCount, name: addedName});
      this.addedName=""
      this.modalVisible=false;
    },
  },
  mounted () {
    this.$store.dispatch('updateAllBalances')
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
}
</style>
