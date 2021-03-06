<template>
  <header class="header">
    <RouterLink
      :to="{ name: 'apps' }"
      class="logo"
    >
      <img src="../../assets/icons/base.svg"> {{ $t('header.title') }}
    </RouterLink>

    <div class="links">
      <RouterLink
        v-for="link in links"
        :key="link.routeName"
        :to="{ name: link.routeName }"
      >
        <Component
          :is="link.icon"
          :class="link.iconClass"
        />
        {{ link.name }}
      </RouterLink>
    </div>

    <ButtonPlain
      :class="{ empty: !account }"
      class="active-account"
      @click="toggleSidebar"
    >
      <div class="details">
        {{ account ? name : $t('header.connect-account') }}
        <div class="balance">
          {{ account ? convertedBalance : $t('header.connect-account-with') }}
        </div>
      </div>
      <AeIdenticon :address="account ? account.address : ''" />
    </ButtonPlain>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { pluck, switchMap } from 'rxjs/operators';
import {
  Grid, Receive, Settings, Contacts,
} from '../icons';
import ButtonPlain from '../ButtonPlain.vue';
import AeIdenticon from '../AeIdenticon.vue';
import prefixedAmount from '../../filters/prefixedAmount';

export default {
  components: { AeIdenticon, ButtonPlain },
  subscriptions() {
    return {
      account: this.$store.state.observables.activeAccount,
      convertedBalance: this
        .$watchAsObservable(() => this.account, { immediate: true })
        .pipe(
          pluck('newValue'),
          switchMap(shouldSubscribe => (shouldSubscribe
            ? this.$store.state.observables.convertAmount(() => this.account.balance)
            : Promise.resolve(''))),
        ),
    };
  },
  computed: {
    ...mapState('accounts', {
      name(state, { getName }) { return this.account && getName(this.account); },
    }),
    links() {
      return [{
        name: this.$t('app.title'),
        routeName: 'apps',
        icon: Grid,
      }, {
        name: this.$t('transfer.send.title'),
        routeName: 'send',
        icon: Receive,
        iconClass: 'send',
      }, {
        name: this.$t('transfer.receive.title'),
        routeName: 'receive',
        icon: Receive,
      }, {
        name: this.$t('name.title'),
        routeName: 'name-list',
        icon: Contacts,
      }, {
        name: this.$t('settings.title'),
        routeName: 'settings',
        icon: Settings,
      }];
    },
  },
  methods: {
    prefixedAmount,
    ...mapMutations(['toggleSidebar']),
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/typography';

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

      .icon.send {
        transform: rotate(180deg);
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
