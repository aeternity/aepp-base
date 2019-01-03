<template>
  <header class="header">
    <router-link
      :to="{ name: 'apps' }"
      class="logo"
    >
      <img src="../../assets/icons/base.svg">Base web
    </router-link>

    <div class="links">
      <router-link
        v-for="link in links"
        :key="link.routeName"
        :to="{ name: link.routeName }"
      >
        <ae-icon
          :name="link.iconName"
          :class="link.iconClass"
        />
        {{ link.name }}
      </router-link>
    </div>

    <button-plain
      :class="{ empty: !account }"
      class="active-account"
      @click="toggleSidebar"
    >
      <div class="details">
        {{ account ? account.name : 'Connect an account' }}
        <div class="balance">
          {{ account ? `${prefixedAmount(account.balance)} AE` : 'With Base æpp or Ledger' }}
        </div>
      </div>
      <ae-identicon :address="account ? account.address : ''" />
    </button-plain>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { AeIcon, AeIdenticon } from '@aeternity/aepp-components-3';
import ButtonPlain from '../ButtonPlain.vue';
import prefixedAmount from '../../filters/prefixedAmount';

export default {
  components: { AeIcon, AeIdenticon, ButtonPlain },
  data: () => ({
    links: [{
      name: 'Browser',
      routeName: 'apps',
      iconName: 'grid',
    }, {
      name: 'Send',
      routeName: 'send',
      iconName: 'receive',
      iconClass: 'send',
    }, {
      name: 'Receive',
      routeName: 'receive',
      iconName: 'receive',
    }, {
      name: 'Contacts',
      routeName: 'address-book',
      iconName: 'contacts',
    }, {
      name: 'Settings',
      routeName: 'settings',
      iconName: 'settings',
    }],
  }),
  computed: mapGetters({ account: 'activeIdentity' }),
  methods: {
    prefixedAmount,
    ...mapMutations(['toggleSidebar']),
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin-bottom: 50px;
  border-bottom: 1px solid $color-neutral-positive-1;

  .logo, .active-account {
    width: 220px;
  }

  .logo, .links {
    white-space: nowrap;
  }

  .logo {
    margin-left: rem(30px);
    text-decoration: none;
    color: $color-neutral-negative-3;
    @extend %face-sans-base;
    font-weight: 500;

    img {
      width: rem(32px);
      height: rem(32px);
      margin-right: rem(12px);
      padding: rem(5px);
      border-radius: rem(5px);
      box-sizing: border-box;
      background: $color-primary;
      vertical-align: middle;
    }
  }

  .links {
    display: flex;

    a {
      display: block;
      margin: 0 rem(15px);
      padding: 0 rem(5px);
      @extend %face-uppercase-xs;
      color: $color-neutral-negative-2;
      text-decoration: none;
      font-weight: bold;
      height: rem(80px);
      line-height: rem(80px);

      .ae-icon {
        font-size: rem(20px);
        vertical-align: middle;

        &.send {
          transform: rotate(180deg);
        }
      }

      &.router-link-exact-active {
        border-bottom: rem(2px) solid $color-primary;
      }
    }
  }

  .active-account {
    margin-right: rem(30px);
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &.empty {
      .details .balance {
        font-size: rem(10px);
      }

      .ae-identicon {
        box-shadow: 0 0 0 2px #ccc;
        opacity: .5;
        filter: grayscale(100%);
      }
    }

    .details {
      margin-right: rem(20px);
      @extend %face-sans-xs;
      font-weight: 500;
      color: $color-neutral-negative-3;
      text-align: right;

      .balance {
        color: $color-neutral;
      }
    }

    .ae-identicon {
      width: rem(26px);
      height: rem(26px);
      border: rem(2px) solid transparent;
      box-shadow: 0 0 0 2px $color-primary;
    }
  }
}
</style>
